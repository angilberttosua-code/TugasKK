const projectModel = require("../models/projectModels");

const getProjects = (req, res) => {
  projectModel.getAllProjects((err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil data proyek",
        error: err.message,
      });
    }
    res.json({
      success: true,
      message: "Data proyek berhasil diambil",
      data: results,
    });
  });
};

const getProjectDetail = (req, res) => {
  const { id } = req.params;
  projectModel.getProjectById(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal mengambil detail proyek",
        error: err.message,
      });
    }
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Proyek tidak ditemukan",
      });
    }
    res.json({
      success: true,
      message: "Detail proyek berhasil diambil",
      data: result,
    });
  });
};

const createProject = (req, res) => {
  const { title, category, description, tech, demoUrl, githubUrl } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Judul proyek wajib diisi",
    });
  }

  const data = {
    title,
    category: category || "",
    description: description || "",
    tech: tech || [],
    demo_url: demoUrl || "",
    github_url: githubUrl || "",
  };

  projectModel.createProject(data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal menambahkan proyek",
        error: err.message,
      });
    }
    res.status(201).json({
      success: true,
      message: "Proyek berhasil ditambahkan",
      data: { id: results.insertId, ...data },
    });
  });
};

const updateProject = (req, res) => {
  const { id } = req.params;
  const { title, category, description, tech, demoUrl, githubUrl } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Judul proyek wajib diisi",
    });
  }

  projectModel.getProjectById(id, (err, existing) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal memeriksa data proyek",
        error: err.message,
      });
    }

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Proyek yang akan diubah tidak ditemukan",
      });
    }

    const data = {
      title,
      category: category || "",
      description: description || "",
      tech: tech || [],
      demo_url: demoUrl || "",
      github_url: githubUrl || "",
    };

    projectModel.updateProject(id, data, (updateErr) => {
      if (updateErr) {
        return res.status(500).json({
          success: false,
          message: "Gagal memperbarui proyek",
          error: updateErr.message,
        });
      }
      res.json({
        success: true,
        message: "Proyek berhasil diperbarui",
        data: { id: Number(id), ...data },
      });
    });
  });
};

const deleteProject = (req, res) => {
  const { id } = req.params;

  projectModel.getProjectById(id, (err, existing) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Gagal memeriksa data proyek",
        error: err.message,
      });
    }

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Proyek yang akan dihapus tidak ditemukan",
      });
    }

    projectModel.deleteProject(id, (deleteErr) => {
      if (deleteErr) {
        return res.status(500).json({
          success: false,
          message: "Gagal menghapus proyek",
          error: deleteErr.message,
        });
      }
      res.json({
        success: true,
        message: "Proyek berhasil dihapus",
      });
    });
  });
};

module.exports = {
  getProjects,
  getProjectDetail,
  createProject,
  updateProject,
  deleteProject,
};