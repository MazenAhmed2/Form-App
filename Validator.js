import JOI from 'joi'


/**
 * The password must be between 8-36 character
 */
const schema = JOI.object({
  email: JOI.string().email().required(),
  password: JOI.string().min(8).max(36)
})

function validator(body, callback){
  let validationResult = schema.validate(body)
  if(validationResult.error) return callback(validationResult.error)
  else return callback(null, validationResult.value)
  
}


export default validator