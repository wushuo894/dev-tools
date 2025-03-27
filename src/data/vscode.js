export let downloads = {
    "Windows x64 System installer": "https://update.code.visualstudio.com/{version}/win32-x64/stable",
    "Windows x64 User installer": "https://update.code.visualstudio.com/{version}/win32-x64-user/stable",
    "Windows x64 zip": "https://update.code.visualstudio.com/{version}/win32-x64-archive/stable",
    "Windows x64 CLI": "https://update.code.visualstudio.com/{version}/cli-win32-x64/stable",
    "Windows Arm64 System installer": "https://update.code.visualstudio.com/{version}/win32-arm64/stable",
    "Windows Arm64 User installer": "https://update.code.visualstudio.com/{version}/win32-arm64-user/stable",
    "Windows Arm64 zip": "https://update.code.visualstudio.com/{version}/win32-arm64-archive/stable",
    "Windows Arm64 CLI": "https://update.code.visualstudio.com/{version}/cli-win32-arm64/stable",
    "macOS Universal": "https://update.code.visualstudio.com/{version}/darwin-universal/stable",
    "macOS Intel chip": "https://update.code.visualstudio.com/{version}/darwin/stable",
    "macOS Intel chip CLI": "https://update.code.visualstudio.com/{version}/cli-darwin-x64/stable",
    "macOS Apple silicon": "https://update.code.visualstudio.com/{version}/darwin-arm64/stable",
    "macOS Apple silicon CLI": "https://update.code.visualstudio.com/{version}/cli-darwin-arm64/stable",
    "Linux x64": "https://update.code.visualstudio.com/{version}/linux-x64/stable",
    "Linux x64 debian": "https://update.code.visualstudio.com/{version}/linux-deb-x64/stable",
    "Linux x64 rpm": "https://update.code.visualstudio.com/{version}/linux-rpm-x64/stable",
    "Linux x64 snap": "https://update.code.visualstudio.com/{version}/linux-snap-x64/stable",
    "Linux x64 CLI": "https://update.code.visualstudio.com/{version}/cli-linux-x64/stable",
    "Linux Arm32": "https://update.code.visualstudio.com/{version}/linux-armhf/stable",
    "Linux Arm32 debian": "https://update.code.visualstudio.com/{version}/linux-deb-armhf/stable",
    "Linux Arm32 rpm": "https://update.code.visualstudio.com/{version}/linux-rpm-armhf/stable",
    "Linux Arm32 CLI": "https://update.code.visualstudio.com/{version}/cli-linux-armhf/stable",
    "Linux Arm64": "https://update.code.visualstudio.com/{version}/linux-arm64/stable",
    "Linux Arm64 debian": "https://update.code.visualstudio.com/{version}/linux-deb-arm64/stable",
    "Linux Arm64 rpm": "https://update.code.visualstudio.com/{version}/linux-rpm-arm64/stable",
    "Linux Arm64 CLI": "https://update.code.visualstudio.com/{version}/cli-linux-arm64/stable"
}

export let getVersions = async () => {
    let res = await fetch('https://api.github.com/repos/microsoft/vscode/releases?page=1&per_page=100')
    let releases = await res.json()
    return Array.from(releases)
        .map(it => it['tag_name'])
}