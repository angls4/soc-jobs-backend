const { Application, Job, User, Position, Experience } = require("../db/models");
const { crudController } = require("../utils/crud");
const userController = require("./userController");
const jobController = require("./jobController");
const fs = require("fs");
const ejs = require("ejs");
const {mailOptions} = require("../config/emailerConfig");


const attributes = ["status", "updatedAt"];
const includeUser = {
  model: User,
  as: "User",
  attributes: ["name"],
  // attributes: userController.attributes,
};
const includeJob = {
  model: Job,
  as: "Job",
  attributes: ["title"],
  // include:jobController.include
  include: [
    {
      model: Position,
      as: "jobPosition",
      attributes: ["position_name"],
    },
    {
      model: Experience,
      as: "jobExperience",
      attributes: ["exp_desc"],
    },
  ],
};
const include = [includeUser, includeJob];

const applicationEmailTemplate = fs.readFileSync("./src/emails/email.ejs", {
  encoding: "utf-8",
});
// Render the email

module.exports = {
  includeUser,
  includeJob,
  attributes,
  getAll: async (req, res) => {
    return await crudController.getAll(Application, {
      where: {},
      include,
      paginated: true,
    })(req, res);
  },
  getById: crudController.getById(Application, { include }),
  getByUserId: async (req, res) => {
    const { id } = req.params;
    return await crudController.getAll(Application, {
      where: { userId: id },
      include: includeJob,
      attributes,
    })(req, res);
  },
  getByJobId: async (req, res) => {
    const { id } = req.params;
    return await crudController.getAll(Application, {
      where: { jobId: id },
      include: includeUser,
      attributes,
    })(req, res);
  },
  create: async (req, res) => {
    const data = req.body;
    // TODO : validation
    // verify if not admin
    const { closedAt, quota, applicant } = await Job.findOne({
      where: { id: data.jobId },
    });
    if (req.user.role !== "Admin") {
      // verify if job closed
      const close = new Date(closedAt).getTime();
      const now = new Date().getTime();
      // console.log(`closed ${close}, now ${now}`);
      // if closed
      if (now >= close) {
        return res.status(400).json({
          message: `Job is closed`,
        });
      }
      // verify if quota availible
      if (applicant >= quota) {
        return res.status(400).json({
          message: `Job is full`,
        });
      }
    }
    const ret = await crudController.create(Application, data)(req, res);
    console.log(ret);
    return ret;
  },
  update: async (req, res) => {
    const ret =  await crudController.update(Application, { include })(req,res) // TODO : validation
    // console.log(ret)
    console.log(res.statusCode)
    if(ret.statusMessage == "OK"){
      // const status = ret?.body?.status; // Application's status
      // if(status){
      //   const user = req.user
      //   let emailMessage = ''
      //   if(status === "Rejected"){
      //     emailMessage = ejs.render(applicationEmailTemplate,{
      //       name: user.name,
      //       applicationId: params.id,
      //       status: "Ditolak 😤"
      //     })
      //   }
      //   else if (status === "Accepted") {
      //     emailMessage = ejs.render(applicationEmailTemplate, {
      //       name: user.name,
      //       applicationId: params.id,
      //       status: "Diterima 😊",
      //     });
      //   }
      //   const emailerResult = await sendEmail({
      //     subject: mailOptions.subjectPrefix + "",
      //     to: user.email,
      //     html: emailMessage,
      //   })
      //     .then(() => {
      //       return "success";
      //     })
      //     .catch((e) => {
      //       console.error(e);
      //       return "not sent";
      //     });
      //   ret["emailStatus"] = emailerResult
      // }
    }
    return ret
  },
  
  
  delete: crudController.delete(Application),
};
