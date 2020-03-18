module.exports = {
  get: () =>
    Promise.resolve({
      data: {
        id: 1,
        title: "Javascript",
        type: 1,
        content: [
          {
            id: 13,
            title: "module js",
            type: 2,
            content: [
              {
                id: 14,
                title: "sous module js",
                type: 3,
                content: [
                  {
                    id: 15,
                    title: "sequence js",
                    type: 4,
                    content: [],
                    createdAt: "2014-02-02T00:00:00.000Z",
                    updatedAt: "2014-02-02T00:00:00.000Z"
                  }
                ],
                createdAt: "2014-02-02T00:00:00.000Z",
                updatedAt: "2014-02-02T00:00:00.000Z"
              },
              {
                id: 17,
                title: "sous module js 2",
                type: 3,
                content: [],
                createdAt: "2014-02-02T00:00:00.000Z",
                updatedAt: "2014-02-02T00:00:00.000Z"
              }
            ],
            createdAt: "2014-02-02T00:00:00.000Z",
            updatedAt: "2014-02-02T00:00:00.000Z"
          },
          {
            id: 16,
            title: "module 2 js",
            type: 2,
            content: [],
            createdAt: "2014-02-02T00:00:00.000Z",
            updatedAt: "2014-02-02T00:00:00.000Z"
          }
        ],
        createdAt: "2012-12-12T00:00:00.000Z",
        updatedAt: "2012-12-12T00:00:00.000Z"
      }
    })
};
