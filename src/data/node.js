export let getReleases = async () => {
    let res = await fetch('https://nodejs.org/download/release/index.json')
    let releases = await res.json()
    return Array.from(releases)
        .slice(0, 200)
        .map(it => {
            let {version, date, files} = it
            return files
                .map(file => {
                    let fileName = ''
                    switch (file) {
                        case 'linux-arm64':
                            fileName = `node-${version}-linux-arm64.tar.gz`
                            break
                        case 'linux-armv7l':
                            fileName = `node-${version}-linux-armv7l.tar.gz`
                            break
                        case 'linux-ppc64le':
                            fileName = `node-${version}-linux-ppc64le.tar.gz`
                            break
                        case 'linux-s390x':
                            fileName = `node-${version}-linux-s390x.tar.gz`
                            break
                        case 'linux-x64':
                            fileName = `node-${version}-linux-x64.tar.gz`
                            break
                        case 'osx-arm64-tar':
                            fileName = `node-${version}-darwin-arm64.tar.gz`
                            break
                        case 'osx-x64-pkg':
                            fileName = `node-${version}.pkg`
                            break
                        case 'osx-x64-tar':
                            fileName = `node-${version}-x64.tar.gz`
                            break
                        case 'win-arm64-7z':
                            fileName = `node-${version}-win-arm64.7z`
                            break
                        case 'win-arm64-zip':
                            fileName = `node-${version}-win-arm64.zip`
                            break
                        case 'win-x64-7z':
                            fileName = `node-${version}-win-x64.7z`
                            break
                        case 'win-x64-msi':
                            fileName = `node-${version}-x64.msi`
                            break
                        case 'win-x64-zip':
                            fileName = `node-${version}-win-x64.zip`
                            break
                        default:
                            return null
                    }

                    let os
                    if (file.match('^linux-')) {
                        os = 'linux'
                    } else if (file.match('^osx-')) {
                        os = 'macOS'
                    } else {
                        os = 'windows'
                    }

                    return {
                        os,
                        version,
                        date,
                        file,
                        fileName,
                        link: `https://nodejs.org/download/release/${version}/${fileName}`
                    }
                }).filter(it => it);
        }).flat(1)
}