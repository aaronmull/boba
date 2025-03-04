const mongoose = require('mongoose')
const Schema = mongoose.Schema

const athleteSchema = new Schema({
    name: {type:String, required:true},
    gender: {type:String, required:true},
    sport: {type:String, requried:true},
    entryDate: {type:Date, default:Date.now}
})

const tenflySchema = new Schema({
    athlete: {type:String, required:true},
    time: {type:Number, required:true},
    date: {type:Date, required:true},
})

const tenstartSchema = new Schema({
    athlete: {type:String, required:true},
    time: {type:Number, required:true},
    date: {type:Date, required:true},
})

const Athlete = mongoose.model('Athlete', athleteSchema, 'athlete')
const TenFly = mongoose.model('TenFly', tenflySchema, 'tenfly')
const TenStart = mongoose.model('TenStart', tenstartSchema, 'tenstart')
const mySchemas = {'Athlete':Athlete, 'TenFly':TenFly, 'TenStart':TenStart}

module.exports = mySchemas