const CryptoJS = require("crypto-js");
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    organization: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    registrationLink: {
      type: String,
    },
    emailUsed: {
      type: String,
    },
    passwordUsed: {
      type: String,
      set: function (value) {
        return CryptoJS.AES.encrypt(
          value,
          process.env.ENCRYPTION_KEY
        ).toString();
      },
      get: function (value) {
        if (!value) return value;

        const bytes = CryptoJS.AES.decrypt(
          value,
          process.env.ENCRYPTION_KEY
        );
        return bytes.toString(CryptoJS.enc.Utf8);
      },
    },
    reminderTime: {
      type: Date,
    },
    reminderSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

module.exports = mongoose.model("Event", eventSchema);
