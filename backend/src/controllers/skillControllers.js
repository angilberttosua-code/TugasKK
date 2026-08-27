const skillModel = require("../models/skillModels");

const getSkills = (req, res) => {
  skillModel.getAllSkills((err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil data skill",
        error: err.message,
      });
    }
    res.json({
      success: true,
      message: "Data skill berhasil diambil",
      data: results,
    });
  });
};

const createSkill = (req, res) => {
  const { skill_group_id, name, level, percentage } = req.body;

  if (!skill_group_id || !name) {
    return res.status(400).json({
      success: false,
      message: "Field skill_group_id dan name wajib diisi",
    });
  }

  const data = { skill_group_id, name, level: level || "", percentage: percentage || 0 };

  skillModel.createSkill(data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal menambah skill",
        error: err.message,
      });
    }
    res.status(201).json({
      success: true,
      message: "Skill berhasil ditambahkan",
      data: {
        id: results.insertId,
        skill_group_id,
        name,
        level,
        percentage,
      },
    });
  });
};

module.exports = {
  getSkills,
  createSkill,
};