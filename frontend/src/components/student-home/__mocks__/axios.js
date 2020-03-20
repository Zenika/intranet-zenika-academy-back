module.exports = {
  get: () =>
    Promise.resolve({
      data: {
        id: 2,
        title: 'PARIS 2',
        city: 'Paris',
        startDate: '2020-10-19T00:00:00.000Z',
        endDate: '2027-01-20T00:00:00.000Z',
        programId: 1,
        createdAt: '2028-11-19T00:00:00.000Z',
        updatedAt: '2028-11-19T00:00:00.000Z',
      },
    }),
};
