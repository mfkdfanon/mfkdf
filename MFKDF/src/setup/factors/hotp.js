/**
 * @file MFKDF HOTP Factor Setup
 * @copyright Multifactor 2022 All Rights Reserved
 *
 * @description
 * Setup an HOTP factor for multi-factor key derivation
 *
 * @author anon anon (https://anon.me) <anon@anon.me>
 */
const defaults = require('../../defaults')
const crypto = require('crypto')
const xor = require('buffer-xor')
const speakeasy = require('speakeasy')
const random = require('random-number-csprng')

function mod (n, m) {
  return ((n % m) + m) % m
}

/**
 * Setup an MFKDF HOTP factor
 *
 * @example
 * // setup key with hotp factor
 * const setup = await mfkdf.setup.key([
 *   await mfkdf.setup.factors.hotp({ secret: Buffer.from('hello world') })
 * ], {size: 8})
 *
 * // derive key with hotp factor
 * const derive = await mfkdf.derive.key(setup.policy, {
 *   hotp: mfkdf.derive.factors.hotp(365287)
 * })
 *
 * setup.key.toString('hex') // -> 01d0c7236adf2516
 * derive.key.toString('hex') // -> 01d0c7236adf2516
 *
 * @param {Object} [options] - Configuration options
 * @param {string} [options.id='hotp'] - Unique identifier for this factor
 * @param {string} [options.hash='sha1'] - Hash algorithm to use; sha512, sha256, or sha1
 * @param {number} [options.digits=6] - Number of digits to use
 * @param {Buffer} [options.secret] - HOTP secret to use; randomly generated by default
 * @param {Buffer} [options.issuer='MFKDF'] - OTPAuth issuer string
 * @param {Buffer} [options.label='mfkdfanon.github.io'] - OTPAuth label string
 * @returns {MFKDFFactor} MFKDF factor information
 * @author anon anon (https://anon.me) <anon@anon.me>
 * @since 0.12.0
 * @async
 * @memberof setup.factors
 */
async function hotp (options) {
  options = Object.assign(Object.assign({}, defaults.hotp), options)

  if (typeof options.id !== 'string') throw new TypeError('id must be a string')
  if (options.id.length === 0) throw new RangeError('id cannot be empty')
  if (!Number.isInteger(options.digits)) throw new TypeError('digits must be an interger')
  if (options.digits < 6) throw new RangeError('digits must be at least 6')
  if (options.digits > 8) throw new RangeError('digits must be at most 8')
  if (!['sha1', 'sha256', 'sha512'].includes(options.hash)) throw new RangeError('unrecognized hash function')
  if (!Buffer.isBuffer(options.secret) && typeof options.secret !== 'undefined') throw new TypeError('secret must be a buffer')

  const target = await random(0, (10 ** options.digits) - 1)
  const buffer = Buffer.allocUnsafe(4)
  buffer.writeUInt32BE(target, 0)

  return {
    type: 'hotp',
    id: options.id,
    data: buffer,
    entropy: Math.log2(10 ** options.digits),
    params: async ({ key }) => {
      if (typeof options.secret === 'undefined') options.secret = crypto.randomBytes(Buffer.byteLength(key))

      const code = parseInt(speakeasy.hotp({
        secret: options.secret.toString('hex'),
        encoding: 'hex',
        counter: 1,
        algorithm: options.hash,
        digits: options.digits
      }))

      const offset = mod(target - code, 10 ** options.digits)

      return {
        hash: options.hash,
        digits: options.digits,
        pad: xor(options.secret, key.slice(0, Buffer.byteLength(options.secret))).toString('base64'),
        counter: 1,
        offset
      }
    },
    output: async () => {
      return {
        scheme: 'otpauth',
        type: 'hotp',
        label: options.label,
        secret: options.secret,
        issuer: options.issuer,
        algorithm: options.hash,
        digits: options.digits,
        counter: 1,
        uri: speakeasy.otpauthURL({
          secret: options.secret.toString('hex'),
          encoding: 'hex',
          label: options.label,
          type: 'hotp',
          counter: 1,
          issuer: options.issuer,
          algorithm: options.hash,
          digits: options.digits
        })
      }
    }
  }
}
module.exports.hotp = hotp
