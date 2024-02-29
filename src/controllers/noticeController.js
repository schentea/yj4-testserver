import Notice from "../models/notice";

export const noticeList = async (req, res) => {
  try {
    const data = await Notice.find({});
    return res.send({ name: "list", data });
  } catch (error) {
    console.log(error);
  }
};

export const noticeWrite = async (req, res) => {
  try {
    console.log(req.body);
    const { title, description, writer } = req.body;
    const data = await Notice.create({
      title,
      description,
      writer,
      createdAt: Date.now(),
    });
    return res.send({ result: true, data });
  } catch (error) {
    console.log(error);
    return res.send({ result: false });
  }
};
export const noticeDetail = async (req, res) => {
  try {
    const data = await Notice.findById();
    return res.send({ name: "detail", data });
  } catch (errors) {
    console.log(errors);
  }
};
export const noticeEdit = async (req, res) => {
  // const { title, description, writer } = req.body;
  // const {
  //   params: { id },
  // } = req;
  const {
    body: { title, description, writer },
    params: { id },
  } = req;
  try {
    const data = await Notice.findByIdAndUpdate(id, {
      title,
      description,
      writer,
    });
    res.send({ result: true, data });
  } catch (error) {
    console.log(error);
  }
};
export const noticeDelete = (req, res) => res.send({ name: "delete" });
