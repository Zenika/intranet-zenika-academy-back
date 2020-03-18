module.exports = {
  get: () =>
    Promise.resolve({
      data: [
        {
          id: 2,
          title: "PARIS 2",
          city: "Paris",
          startDate: "2020-10-19T00:00:00.000Z",
          endDate: "2027-01-20T00:00:00.000Z",
          programId: 1,
          createdAt: "2028-11-19T00:00:00.000Z",
          updatedAt: "2028-11-19T00:00:00.000Z"
        },
        {
          id: 3,
          title: "RENNES",
          city: "Rennes",
          startDate: "2020-09-14T00:00:00.000Z",
          endDate: "2020-09-20T00:00:00.000Z",
          programId: 1,
          createdAt: "2020-09-24T00:00:00.000Z",
          updatedAt: "2020-09-14T00:00:00.000Z"
        },
        {
          id: 4,
          title: "GRENOBLE",
          city: "Grenoble",
          startDate: "2023-06-12T00:00:00.000Z",
          endDate: "2030-07-13T00:00:00.000Z",
          programId: 1,
          createdAt: "2025-05-12T00:00:00.000Z",
          updatedAt: "2012-02-20T00:00:00.000Z"
        }
      ]
    })
};
