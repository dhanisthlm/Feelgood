import Request from 'request';

const loadImages = (request, reply) => {
    getMedia(`https://images-api.nasa.gov/search?q=${request.payload.search}&media_type=image`, reply);
};

const loadVideos = (request, reply) => {
    getMedia(`https://images-api.nasa.gov/search?q=${request.payload.search}&media_type=video`, reply);
};

const getAssets = (ids) => {
    return new Promise((resolve) => {
        const assets = [];
        const promises = [];

        ids.forEach((id) => {
            const first = id.charAt(0);
            const letterFirst = first.match(/[a-z]/i);

            if (letterFirst) {
                const promise = new Promise((resolve) => {
                    Request(`https://images-api.nasa.gov/asset/${id}`, (error, response, body) => {
                        assets.push(JSON.parse(body));
                        resolve();
                    })
                });
                promises.push(promise);
            }
        });

        Promise.all(promises)
            .then(() => {
                resolve(assets);
            })
    });
};

const getMetaData = (ids) => {
    return new Promise((resolve) => {
    const data = [];
    const promises = [];

    ids.forEach((id, i) => {
        const first = id.charAt(0);
        const letterFirst = first.match(/[a-z]/i);

        if (letterFirst) {
            const promise = new Promise((resolve, reject) => {
                Request(`https://images-api.nasa.gov/metadata/${id}`, (error, response, body) => {
                    const location = JSON.parse(body).location;

                    if (location) {
                        Request(location, (error, response, body) => {
                            data.push(JSON.parse(body));
                            resolve();
                        });
                    } else {
                        data.push({});
                        resolve();
                    }
                });
            });
            promises.push(promise);
        }
    });

    Promise.all(promises)
        .then(() => {
            resolve(data)
        });
    });
};

const getMedia = (searchUrl, reply) => {
    Request(searchUrl, (error, response, body) => {
        const data = JSON.parse(body);
        const ids = data.collection.items.map(item =>item.data[0].nasa_id);
        const assets = getAssets(ids, reply);
        const metaData = getMetaData(ids, reply);

        Promise.all([assets, metaData]).then((result) => {
            return reply(result);
        })
    });
};

exports.register = (server, options, next) => {
    server.route([
        {
            method: 'POST',
            path: '/images/load',
            config: {
                handler: loadImages
            }
        },
        {
            method: 'POST',
            path: '/videos/load',
            config: {
                handler: loadVideos
            }
        }
    ]);

    next()
};

exports.register.attributes = {
    name: 'gallery'
};