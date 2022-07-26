/**
 * @file MFKDF UUID Factor Setup
 * @copyright Multifactor 2022 All Rights Reserved
 *
 * @description
 * Setup UUID factor for multi-factor key derivation
 *
 * @author anon anon (https://anon.me) <anon@anon.me>
 */
const defaults = require('../../defaults')
const { v4: uuidv4, validate: uuidValidate, parse: uuidParse } = require('uuid')

/**
 * Setup an MFKDF UUID factor
 *
 * @example
 * // setup key with uuid factor
 * const setup = await mfkdf.setup.key([
 *   await mfkdf.setup.factors.uuid({ uuid: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' })
 * ], {size: 8})
 *
 * // derive key with uuid factor
 * const derive = await mfkdf.derive.key(setup.policy, {
 *   uuid: mfkdf.derive.factors.uuid('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')
 * })
 *
 * setup.key.toString('hex') // -> 01d0c7236adf2516
 * derive.key.toString('hex') // -> 01d0c7236adf2516
 *
 * @param {Object} [options] - Configuration options
 * @param {string} [options.uuid] - UUID to use for this factor; random v4 uuid default
 * @param {string} [options.id='uuid'] - Unique identifier for this factor
 * @returns {MFKDFFactor} MFKDF factor information
 * @author anon anon (https://anon.me) <anon@anon.me>
 * @since 0.9.0
 * @async
 * @memberof setup.factors
 */
async function uuid (options) {
  options = Object.assign(Object.assign({}, defaults.uuid), options)

  if (typeof options.id !== 'string') throw new TypeError('id must be a string')
  if (options.id.length === 0) throw new RangeError('id cannot be empty')

  if (typeof options.uuid === 'undefined') options.uuid = uuidv4()
  if (typeof options.uuid !== 'string') throw new TypeError('uuid must be a string')
  if (!uuidValidate(options.uuid)) throw new TypeError('uuid is not a valid uuid')

  return {
    type: 'uuid',
    id: options.id,
    entropy: 122,
    data: Buffer.from(uuidParse(options.uuid)),
    params: async () => {
      return {}
    },
    output: async () => {
      return { uuid: options.uuid }
    }
  }
}
module.exports.uuid = uuid
