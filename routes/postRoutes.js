const express = require("express");
const { postModel } = require("../model/postmodel");

const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  try {
    const posts = await postModel.find();
    res.send(posts);
  } catch (err) {
    res.send("err");
    console.log("err");
  }
});

postRouter.post("/addpost", async (req, res) => {
  const payload = req.body;
  try {
    const newpost = new postModel(payload);
    await newpost.save();
    res.send("added");
  } catch (err) {
    res.send("err");
  }
});

postRouter.patch("/update", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const posts = await postModel.findOne({ " _id": id });
  const userpost = posts.userID;
  const userreq = req.body.userID;
  try {
    if (userreq !== userpost) {
      res.send("not ");
    } else {
      await postModel.findByIdAndUpdate({ " _id": id }, payload);
    }
  } catch (err) {
    res.send("wrong");
  }
});

postRouter.delete("/delete", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const post = await postModel.findOne({ " _id": id });
  const userpost = post.userID;
  const userreq = req.body.userID;
  try {
    if (userreq !== userpost) {
      res.send("not ");
    } else {
      await postModel.findByIdAndDelete({ " _id": id });
    }
  } catch (err) {
    res.send("wrong");
  }
});

module.exports = {
  postRouter,
};
