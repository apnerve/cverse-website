/**
 * Company details shared by every page: name, contact, address, social links, and the
 * default <head> title and description. The page copy itself lives in exec.ts.
 */

export const site = {
  name: 'cverse',
  legalName: 'CVerse Ventures FZCO',
  title: 'cverse | AI engineering for enterprises',
  description:
    'cverse builds LLM, agent, and forecasting systems for enterprises and runs them in the client’s own cloud.',
  url: 'https://cverse.ai',
  email: 'info@cverse.ai',
  address: {
    lines: ['DDP, Building A1, Dubai Silicon Oasis', 'Dubai 341041, UAE'],
    locality: 'Dubai',
    postalCode: '341041',
    country: 'AE',
  },
  /**
   * Social profiles. Leave a URL empty to hide that icon.
   * TODO: fill in the real profile URLs.
   */
  social: {
    linkedin: '',
    x: '',
  },
};
