module.exports.generarToken = async (data) => {
    try {
        let tokenSign = jwt.sign({data}, process.env.SECRET_KEY)
        return tokenSign
    }catch (err){
        console.log(err)
        throw new Error (err)
    }
}