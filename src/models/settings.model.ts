import {Schema,model, models} from 'mongoose'

interface Settings{
    ownerId:string,
    businessName:string,
    supportEmail:string,
    data:string
}

const settingSchema = new Schema<Settings>({

    ownerId:{
        type:String,
        unique:true,
        required:true
    },
    businessName:{
        type:String,
        required:true
    },
    supportEmail:{
        type:String
    },
    data:{
        type:String,
        required:true
    }

},{timestamps:true})

const Settings = models.Settings ||  model("Settings",settingSchema);

export default Settings;