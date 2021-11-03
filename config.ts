type InterestSettings = {
  newProjects: boolean;
  fellowships: string[];
}

type Configuration = {
  sqliteFile: string;
  feedEventsPerPage: number;
  fellowshipInterests: {
    founders: InterestSettings;
    angels: InterestSettings;
    writers: InterestSettings;
  };
}

const config: Configuration = {
  sqliteFile: 'db.sqlite',
  feedEventsPerPage: 6,
  fellowshipInterests: {
    founders: { newProjects: true, fellowships: ['angels', 'founders'] },
    angels: { newProjects: true, fellowships: ['angels', 'founders'] },
    writers: { newProjects: false, fellowships: ['writers'] },
  },
}

export default config;
