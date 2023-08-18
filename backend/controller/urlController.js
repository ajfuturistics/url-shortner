const { nanoid } = require("nanoid");
const Url = require("../models/urlModel");

// get all user created urls
const getAllUserUrls = async (req, res) => {
  try {
    const user = req.user;

    const urlArr = await Url.find({ userId: user._id });

    return res.status(200).json({
      urlArr,
      message: "url created",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err });
  }
};

// create short url
const shortenUrl = async (req, res) => {
  try {
    const { longurl } = req.body;
    const user = req.user;

    if (!longurl) {
      return res.status(400).json({ message: "long url is required" });
    }

    // generate url id
    const urlId = nanoid();

    console.log({ urlId, longurl, user: req.user });

    const shortUrl = await Url.create({
      urlId,
      longurl,
      userId: user._id,
      views: 0,
    });

    return res.status(201).json({
      shortUrl,
      message: "url created",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err });
  }
};

// get single url
const getUrlData = async (req, res) => {
  try {
    const urlData = await Url.findById(req.params.id);
    if (!urlData) {
      return res.status(404).json({ message: "Url not found" });
    }

    if (urlData.userId.toString() !== req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "You are not allowed to view this url" });
    }

    return res.status(200).json({
      urlData,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err });
  }
};

// update user created url
const updateUrlData = async (req, res) => {
  try {
    const { longurl } = req.body;
    const urlData = await Url.findById(req.params.id);

    if (!urlData) {
      return res.status(404).json({ message: "Url not found" });
    }

    if (urlData.userId.toString() !== req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "You are not allowed to update this url" });
    }

    urlData.longurl = longurl;

    await urlData.save();

    return res.status(200).json({
      urlData,
      message: "url data updated successfully",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err });
  }
};

// delete user created url
const deleteUrlData = async (req, res) => {
  try {
    const urlData = await Url.findById(req.params.id);
    if (!urlData) {
      return res.status(404).json({ message: "Url not found" });
    }

    if (urlData.userId.toString() !== req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "You are not allowed to delete this url" });
    }

    await urlData.deleteOne();

    return res.status(200).json({
      message: "url deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err });
  }
};

// public route to access shorten url
const getUrl = async (req, res) => {
  try {
    const urlId = req.params.id;

    const urlData = await Url.findOne({ urlId });

    if (!urlData) {
      return res
        .status(400)
        .send(`<h1 style="text-align: center;">Invalid Url</h1>`);
    }

    // for tracking views
    const currentViews = urlData.views || 0;
    urlData.views = currentViews + 1;
    await urlData.save();

    return res.status(200).redirect(urlData.longurl);
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send(`<h1 style="text-align: center;">Something went wrong</h1>`);
  }
};

module.exports = {
  shortenUrl,
  getUrl,
  getUrlData,
  updateUrlData,
  deleteUrlData,
  getAllUserUrls,
};
