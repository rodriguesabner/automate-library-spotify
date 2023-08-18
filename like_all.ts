interface getAllMusicsAndActionProps {
    action: 'like' | 'dislike';
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
        if (actionButton.ariaLabel === 'Remove from Your Library') actionButton.click();
    }
}

function dislikeMusic(role: Element) {
    const actionButton = getActionButton(role);
    if (actionButton != null) {
        if (actionButton.ariaLabel === 'Add to Your Library') actionButton.click();
    }
}

function getAllMusicsAndAction(props: getAllMusicsAndActionProps) {
    const musicElements = getAllMusics();
    console.log(musicElements.length + ' musics found');

    for (const element of musicElements) {
        const textAction = props.action === 'like' ? 'removida' : 'adicionada';
        const music: HTMLAnchorElement | null = element.querySelector("[data-testid='internal-track-link']");
        const musicName = music?.innerText;

        if (props.action === 'like') {
            likeMusic(element);
        } else if (props.action === 'dislike') {
            dislikeMusic(element);
        }

        console.log(`Musica ${musicName} ${textAction} com sucesso!`);

        if (props.printLink) console.log(music?.href);
        console.log('-------------------')
    }
}

getAllMusicsAndAction({action: 'like', printLink: true});
