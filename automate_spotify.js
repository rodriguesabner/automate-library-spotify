function getAllMusics() {
    if (typeof document !== 'undefined') {
        var elementNodeListOf = document.querySelectorAll("[data-testid='tracklist-row']");
        if (elementNodeListOf.length === 0)
            return [];
        return Array.from(elementNodeListOf);
    }
    return [];
}
function getActionButton(role) {
    return role.querySelector("[data-testid='add-button']");
}
function likeMusic(role) {
    var actionButton = getActionButton(role);
    if (actionButton != null) {
        if (actionButton.ariaLabel === 'Save to Your Library')
            actionButton.click();
    }
}
function dislikeMusic(role) {
    var actionButton = getActionButton(role);
    if (actionButton != null) {
        if (actionButton.ariaLabel === 'Remove from Your Library')
            actionButton.click();
    }
}
function getAllMusicsAndAction(props) {
    var musicElements = getAllMusics();
    console.log(musicElements.length + ' musics found');
    for (var _i = 0, musicElements_1 = musicElements; _i < musicElements_1.length; _i++) {
        var element = musicElements_1[_i];
        var textAction = props.action === 'add' ? 'added' : 'removed';
        var music = element.querySelector("[data-testid='internal-track-link']");
        if (props.action === 'add') {
            likeMusic(element);
        }
        else if (props.action === 'remove') {
            dislikeMusic(element);
        }
        if (music == null)
            continue;
        console.log("Music ".concat(textAction, ": ").concat(music === null || music === void 0 ? void 0 : music.innerText));
        if (props.printLink)
            console.log(music === null || music === void 0 ? void 0 : music.href);
        console.log('-------------------');
    }
}
getAllMusicsAndAction({ action: 'add', printLink: true });
