/**
 * @file MFKDF Stack Factor Derivation
 * @copyright Multifactor 2022 All Rights Reserved
 *
 * @description
 * Derive key stacking factor for multi-factor key derivation
 *
 * @author anon anon (https://anon.me) <anon@anon.me>
 */

const deriveKey = require('../key').key

/**
 * Derive an MFKDF stacked key factor
 *
 * @example
 * // setup key with hmacsha1 factor
 * const setup = await mfkdf.setup.key([
 *   await mfkdf.setup.factors.hmacsha1()
 * ], {size: 8})
 *
 * // calculate response; could be done using hardware device
 * const secret = setup.outputs.hmacsha1.secret
 * const challenge = Buffer.from(setup.policy.factors[0].params.challenge, 'hex')
 * const response = crypto.createHmac('sha1', secret).update(challenge).digest()
 *
 * // derive key with hmacsha1 factor
 * const derive = await mfkdf.derive.key(setup.policy, {
 *   hmacsha1: mfkdf.derive.factors.hmacsha1(response)
 * })
 *
 * setup.key.toString('hex') // -> 01d0c7236adf2516
 * derive.key.toString('hex') // -> 01d0c7236adf2516
 *
 * @param {Object.<string, MFKDFFactor>} factors - Factors used to derive this key
 * @returns {function(config:Object): Promise<MFKDFFactor>} Async function to generate MFKDF factor information
 * @author anon anon (https://anon.me) <anon@anon.me>
 * @since 0.15.0
 * @memberof derive.factors
 */
function stack (factors) {
  return async (params) => {
    const key = await deriveKey(params, factors)

    return {
      type: 'stack',
      data: key.key,
      params: async () => {
        return key.policy
      },
      output: async () => {
        return key
      }
    }
  }
}
module.exports.stack = stack
