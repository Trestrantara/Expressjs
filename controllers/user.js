const User = require('../models/user')

module.exports = {
    // get all users
    index: async (req, res) => {  //untuk menampilkan semua data user
        try {
            const users = await User.find()
            if(users.length > 0){
                res.status(200).json({
                    status: true,
                    data: users,
                    method: req.method,
                    url: req.url 
                })
            }else{
                res.json({
                    status: false,
                    message: "Data Kosong"
                })
            }           
        } catch (error) {
            res.status(400).json({success: false})
        }
        
    },
    // get a user
    show: async (req, res) => { //menyimpan perubahan data dengan ID tertentu
        try {
            const user = await User.findById(req.params.id)
            res.json({
                status: true,
                data: user,
                method: req.method,
                url: req.url,
                message: "Data Berhasil Di dapat"
            })
            
        } catch (error) {
            res.status(400).json({success: false})
        }
    },

    store: async (req, res) => { //untuk menyimpan data
        try {
            const user = await User.create(req.body)
            res.status(200).json({
                status: true,
                data: user,
                method: req.method,
                url: req.url,
                message: "Data Berhasil Ditambahkan"
            })
        } catch (error) {
            res.status(400).json({success: false})
        }
    },     
    update: async (req, res) => { //menyimpan perubahan data dengan ID tertentu
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            })
            res.json({
                status: true,
                data: user,
                method: req.method,
                url: req.url,
                message: "Data Berhasil Diubah"
            })
            
        } catch (error) {
            res.status(400).json({success: false})
        }  
            
    },

    delete: async (req, res) => { //Menghapus data user dengan ID data tertentu
        try {
            await User.findByIdAndDelete(req.params.id)
            res.json({
                status: true,
                method: req.method,
                url: req.url,
                message: "Data Berhasil Dihapus"
            })
        } catch (error) {
            res.status(400).json({success: false})
        }
    }
}