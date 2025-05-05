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

const miscDataSchema = new Schema({
    athlete: {type:String, required:true},
    metric: {type:String, required:true},
    measurement: {type:String, required:true},
    date: {type:Date, default:Date.now},
})

const miscMetricSchema = new Schema({
    metric: {type:String, required:true},
    units: {type:String, required:true},
})

const Athlete = mongoose.model('Athlete', athleteSchema, 'athlete')
const TenFly = mongoose.model('TenFly', tenflySchema, 'tenfly')
const TenStart = mongoose.model('TenStart', tenstartSchema, 'tenstart')
const MiscData = mongoose.model('MiscData', miscDataSchema, 'misc_data')
const MiscMetric = mongoose.model('MiscMetrics', miscMetricSchema, 'misc_metrics')
const mySchemas = {
    'Athlete':Athlete,
    'TenFly':TenFly,
    'TenStart':TenStart,
    'MiscData':MiscData,
    'MiscMetrics':MiscMetric,
}

module.exports = mySchemas