interface getAllMusicsAndActionProps {
    action: 'add' | 'remove';
    printLink?: boolean;
}

function getAllMusics(): Element[] | [] {
    if (typeof document !== 'undefined') {
        const elementNodeListOf = document.querySelectorAll("[data-testid='tracklist-row']");
        if (elementNodeListOf.length === 0) return [];

        return Array.from(elementNodeListOf);
    }

    return [];
}

function getActionButton(role: Element): HTMLButtonElement | null {
    return role.querySelector("[data-testid='add-button']");
}

function likeMusic(role: Element) {
    const actionButton = getActionButton(role);
    if (actionButton != null) {
        if (actionButton.ariaLabel === 'Save to Your Library') actionButton.click();
    }
}

function dislikeMusic(role: Element) {
    const actionButton = getActionButton(role);
    if (actionButton != null) {
        if (actionButton.ariaLabel === 'Remove from Your Library') actionButton.click();
    }
}

function getAllMusicsAndAction(props: getAllMusicsAndActionProps) {
    const musicElements = getAllMusics();
    console.log(musicElements.length + ' musics found');

    for (const element of musicElements) {
        const textAction = props.action === 'add' ? 'added' : 'removed';
        const music: HTMLAnchorElement | null = element.querySelector("[data-testid='internal-track-link']");

        if (props.action === 'add') {
            likeMusic(element);
        } else if (props.action === 'remove') {
            dislikeMusic(element);
        }

        if(music == null) continue;
        console.log(`Music ${textAction}: ${music?.innerText}`)

        if (props.printLink) console.log(music?.href);
        console.log('-------------------')
    }
}

getAllMusicsAndAction({action: 'add', printLink: true});
