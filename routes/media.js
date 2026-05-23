const express = require("express");
const router = express.Router();
const multer = require("multer");
const mediaController = require("../controllers/media.controller");

const upload = multer({ storage: multer.memoryStorage() });

module.exports = router;

router.get("/", async function (req, res) {
  try {
    const result = await mediaController.getAll();
    return res.status(200).json({ Media: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.get("/:id", async function (req, res) {
  try {
    const result = await mediaController.getById(req.params.id);
    return res.status(200).json({ Media: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.post("/upload-single", upload.single("file"), async function (req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ mess: "Vui long chon file" });
    }
    const folder = req.body.folder;
    const result = await mediaController.uploadSingle(req.file, folder);
    return res.status(201).json({ Media: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.post(
  "/upload-multiple",
  upload.array("files", 10),
  async function (req, res) {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ mess: "Vui long chon it nhat mot file" });
      }
      const folder = req.body.folder;
      const result = await mediaController.uploadMultiple(req.files, folder);
      return res.status(201).json({ Media: result });
    } catch (error) {
      return res.status(500).json({ mess: error.message || error });
    }
  },
);

router.put("/:id", async function (req, res) {
  try {
    const result = await mediaController.update(req.params.id, req.body);
    return res.status(200).json({ Media: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const result = await mediaController.remove(req.params.id);
    return res.status(200).json({ Media: result });
  } catch (error) {
    return res.status(500).json({ mess: error.message || error });
  }
});
