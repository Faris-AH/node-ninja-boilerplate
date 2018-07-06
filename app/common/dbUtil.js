function DbUtil() {};

DbUtil.prototype.findById = async function (id) {
    return await this.model.findById(id);
};

DbUtil.prototype.findOne = async function (params) {
    return await this.model.findOne(params);
};

DbUtil.prototype.findAll = async function (params) {
    return await this.model.find(params);
};

DbUtil.prototype.create = async function (modelInfo) {
    let objectModel = new this.model(modelInfo);
    return await objectModel.save();
};

DbUtil.prototype.update = async function (modelInfo, data) {
    return await this.model.findOneAndUpdate({_id: modelInfo.id}, data, {new: true});
};

DbUtil.prototype.delete = async function (id) {
    return await this.model.findOneAndRemove({_id: id});
};

module.exports = DbUtil;