const File = require("../models/File.models");
const fileService = require("../services/fileService");

module.exports.fileControllers = {
    createDir: async ( req, res ) => {
        try {
            const {name, type, parent, userId} = req.body
            const file = await File.create({
                name: name,
                type: type,
                parent: parent,
                user: userId
            })
            const parentFile = await File.findOne({_id: parent})
            if(!parentFile) {
                file.path = name
                await fileService.createDir(file)
            } else {
                file.path = `${parentFile.path}\\${file.name}`
                await fileService.createDir(file)
                parentFile.childs.push(file._id)
                await parentFile.save()
            }
            await file.save
            return res.json(file)
        } catch (error) {
            console.log(e);
            return res.status(400).json(e)
        }
    },

    getFiles: async (req, res) => {
        try {
            const files = await File.find({user: req.body.userId, parent: req.query.parent})
            return res.json({files})
        } catch (e) {
            return res.status(500).json({message: 'Can not get Files'})
        }
    }
}