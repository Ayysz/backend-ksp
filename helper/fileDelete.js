'use strict'

const fs = require('fs-extra');
const path = require('path');
const filePath = path.join(__dirname, '../', '/src');
// delete file jika ada
exports.dltFile = async (data) => {
        const src = path.join(filePath, data)
        
        const exist = await fs.pathExists(src);
        if(exist){
            fs.unlink(src, (err) => {
                if(err){
                    console.log('Error on'),
                    console.error(err)
                }
                console.log('File has been delete Succesfully')
                console.log(`Path File ${src}`)
                return true;
            });
            return true;
        }else{
            return false;
        }
};
