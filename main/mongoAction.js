const { ObjectID } = require('mongodb')
const { serialize } = require('mongodb-extended-json')
module.exports = ({
  event,
  arg,
  handleError
}) => ({
  del() {
    const client = global.shared.dbClient[arg.link]
    const table = client.db(arg.db).collection(arg.collect)
    table.deleteOne({ '_id': ObjectID(arg.data) })
      .then((data) => {
        arg.data = data.deletedCount
        event.sender.send('mongoRes', arg)
      })
  },
  deleteMany() {
    const client = global.shared.dbClient[arg.link]
    const table = client.db(arg.db).collection(arg.collect)
    table.deleteMany(arg.data)
      .then((data) => {
        arg.data = data.deletedCount
        event.sender.send('mongoRes', arg)
      })
  },
  find() {
    const client = global.shared.dbClient[arg.link]
    const table = client.db(arg.db).collection(arg.collect)
    let fitter = arg.data.fitter
    delete arg.data.fitter
    table.find(fitter, arg.data)
      .toArray()
      .then((data) => {
        arg.data = data.map((v) => serialize(v))
        event.sender.send('mongoRes', arg)
      })
  },
  getCollects() {
    const client = global.shared.dbClient[arg.link]
    client.db(arg.db).collections()
      .then((val) => {
        let pro = val.map(async (i) => {
          var info = await i.stats()
          return {
            name: i.collectionName,
            count: info.count,
            sizeOnDisk: info.size,
            totalIndexSize: info.totalIndexSize
          }
        })
        Promise.all(pro)
          .then((res) => {
            arg.data = res
            event.sender.send('mongoRes', arg)
          })
      })
  }
})