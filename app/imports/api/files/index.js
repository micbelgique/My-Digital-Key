// give it the id and extension in MONGOIDSTR.EXTENSION format as argument
const getContentType = (idExt = null) => {
  const extensions = {
    jpg: 'image/jpeg',
    png: 'image/png',
    pdf: 'application/pdf',
  };
  return extensions[idExt];
};

const myFiles = new FileCollection('myFiles', {
  resumable: true,   // Enable built-in resumable.js upload support
  baseURL: '/files',
  http: [
    { method: 'get',
      path: '/:id',  // this will be at route "/files/:id"
      lookup(params) {  // uses express style url params
        let split = params.id !== null ? params.id.split('.') : false;
        split = split.length === 2 && split[0] !== 'undefined' ? split : false;
        let id;
        try {
          id = !split ? false : new Mongo.ObjectID(split[0]);
        } catch (e) {
          id = false;
        }
        const ext = split[1];
        const type = getContentType(ext);
        return { _id: id, contentType: type };       // a query mapping url to myFiles
      },
    },
  ],
},
);

export default myFiles;
