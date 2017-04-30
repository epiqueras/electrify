import prompt from 'prompt'
import colors from 'colors/safe'

prompt.message = colors.yellow.bgCyan('electrify')
prompt.delimiter = colors.yellow('><')

const schema = {
  properties: {
    websiteURL: {
      description: 'Website URL',
      type: 'string',
      default: '',
    },
    userAgent: {
      description: 'User Agent',
      type: 'string',
      default: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
    },
    name: {
      description: 'App Name',
      type: 'string',
      required: true,
    },
    description: {
      description: 'App Description',
      type: 'string',
      default: 'description',
    },
    author: {
      description: 'Author',
      type: 'string',
      default: 'author',
    },
    license: {
      description: 'License',
      type: 'string',
      default: 'UNLICENSED',
    },
    version: {
      description: 'App Version',
      type: 'string',
      default: '1.0.0',
    },
    githubRepo: {
      description: 'Github Repo (username/repo)',
      type: 'string',
      default: '',
    },
    githubToken: {
      description: 'Github Access Token',
      type: 'string',
      default: '',
    },
    appID: {
      description: 'App ID for the Mac App Store',
      type: 'string',
      default: '',
    },
    appCategory: {
      description: 'App Category for the Mac App Store',
      type: 'string',
      default: '',
    },
  },
}

export default function getInput() {
  return new Promise((resolve, reject) => {
    prompt.get(schema, (err, result) => err ? reject(err) : resolve(result))
  })
}
