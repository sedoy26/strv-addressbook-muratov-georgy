const mongoose = require('mongoose')
const Firestore = require('@google-cloud/firestore')
const {
  config: {
    database: { uri }
  }
} = require('../config');

class dbDriver {
  async openConnection() {
    await mongoose.connect(uri, {
      useNewUrlParser: true
    });
    this.db = mongoose.connection;
  }
  async connectFirestore() {
    this.firestore = new Firestore();
  }

  async saveFirestore(contact) {
    const document = this.firestore.doc(
      `${contact.userEmail}/${contact.email}`
    );
    await document.set({
      userEmail: contact.userEmail,
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

  saveInstance(modelInstance) {
    return new Promise((resolve, reject) => {
      modelInstance.save(err => {
        if (err) return reject(err);
        resolve();
      })
    })
  }

  deleteInstance({ model, email }) {
    return new Promise((resolve, reject) => {
      model.findOneAndDelete({ email }, (err, doc) => {
        if (err) reject(err);
        resolve({ doc })
      })
    })
  }

  findInstance({ model, data }) {
    return new Promise((resolve, reject) => {
      model.find(data).exec((err, records) => {
        if (err) return reject(err)
        resolve({ records })
      })
    })
  }

  async dropDB() {
    if (this.db) {
      return this.db.dropDatabase()
    }
    throw new Error('DB Instance not found')
  }

  closeConnection() {
    if (this.db) {
      this.db.close(false, () => {
        console.log('MongoDb connection closed.')
      });
    } else throw new Error('DB Instance not found')
  }
}

module.exports.dbDriver = new dbDriver()
