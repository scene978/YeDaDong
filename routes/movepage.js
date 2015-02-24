var DBpool = require('../lib/DBpool');

exports.moveHome = function(req,res){
    res.render('groupHome');
};

exports.moveBoard = function(req,res){
    res.render('groupBoard');
};

exports.moveSettingBoard = function(req,res) {
    res.render('groupSetting_board');
};

exports.moveSettingMember = function(req,res) {
        res.render('groupSetting_member');
};