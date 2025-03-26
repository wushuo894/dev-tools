export const projects = [
    {
        name: 'IntelliJ IDEA',
        icon: './jetbrains/idea.svg',
        code: 'IIU'
    },
    {
        name: 'GoLand',
        icon: './jetbrains/goland.svg',
        code: 'GO'
    },
    {
        name: 'PyCharm',
        icon: './jetbrains/phpstorm.svg',
        code: 'PCP'
    },
    {
        name: 'WebStorm',
        icon: './jetbrains/webstorm.svg',
        code: 'WS'
    },
    {
        name: 'CLion',
        icon: './jetbrains/clion.svg',
        code: 'CL'
    },
    {
        name: 'DataGrip',
        icon: './jetbrains/datagrip.svg',
        code: 'DG'
    },
    {
        name: 'PhpStorm',
        icon: './jetbrains/phpstorm.svg',
        code: 'PS'
    },
    {
        name: 'Rider',
        icon: './jetbrains/rider.svg',
        code: 'RD'
    },
]


export const platforms = [
    'macM1', 'mac',
    'linux', 'linuxARM64',
    'windows', 'windowsZip', 'windowsARM64', 'windowsZipARM64'
]

export const getReleases = async (projects, latest) => {
    let code = Array.from(projects).map(it => it['code']).join(',')
    let res = await fetch(`https://data.services.jetbrains.com/products/releases?code=${code}&latest=${latest}&type=release`)
    let releases = await res.json()

    Object.keys(releases).forEach(key => {
        let {name, icon} = Array.from(projects).filter(it => it.code === key)[0]

        releases[key].forEach((release) => {
            let {downloads, version, date} = release
            Object.values(downloads).forEach(download => {
                download.name = name
                download.icon = icon
                download.version = version
                download.date = date
            })
        })
    })

    // 将所有下载项降维到一个数组
    return Object.values(releases)
        .flat(1)
        .map(it => it['downloads'])
}

