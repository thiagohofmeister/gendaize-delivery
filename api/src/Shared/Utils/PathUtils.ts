import * as fs from 'fs'
import * as path from 'path'

export class PathUtils {
  private static domains

  public static getEntities() {
    return Object.keys(PathUtils.getDomains())
      .map(domain => {
        return PathUtils.getDomains()[domain].models?.dao
      })
      .filter(dao => !!dao)
  }

  public static getFileNames(path: string) {
    return fs
      .readdirSync(path, { withFileTypes: true })
      .filter(file => !file.isDirectory())
      .map(file => file.name)
  }

  public static getDomain(domainName: string) {
    return this.getDomains()[domainName]
  }

  public static getRepository(domainName: string) {
    return require(PathUtils.getDomain(domainName)['repository'])[`${domainName}Repository`]
  }

  public static getDomains() {
    if (!this.domains) {
      this.fillDomains()
    }

    return this.domains
  }

  private static fillDomains() {
    const rootDir = path.join(__dirname, '..', '..')
    const domains = {}

    const domainsPath = fs
      .readdirSync(rootDir, { withFileTypes: true })
      .filter(dir => dir.isDirectory())
      .map(dir => dir.name)

    domainsPath.forEach(domainName => {
      const domainPath = path.join(rootDir, domainName)

      if (!fs.existsSync(domainPath)) {
        return
      }

      let files = this.getFileNames(domainPath).reduce((prev, curr) => {
        const slices = curr.split(/(?=[A-Z\.])/)
        const type = slices[slices.length - 2]

        prev = {
          ...prev,
          [type.toLocaleLowerCase()]: path.join(domainPath, slices.join(''))
        }

        return prev
      }, {})

      const modelsPath = path.join(domainPath, 'Models')

      if (fs.existsSync(modelsPath)) {
        files['models'] = this.getFileNames(modelsPath).reduce((prev, curr) => {
          const slices = curr.split(/(?=[A-Z\.])/)
          const isDao = slices[slices.length - 2].toLocaleLowerCase() === 'dao'

          prev = {
            ...prev,
            [isDao ? 'dao' : 'domain']: path.join(modelsPath, slices.join(''))
          }

          return prev
        }, {})
      }

      domains[domainName] = { ...files }
    })

    this.domains = domains
  }
}
