/* Widget for Boarderly remote */
class DPad extends HTMLElement {
    constructor() {
        super();
    }

    render() {
        let markup = `
            <link rel="stylesheet" href="/resources/css/remote.css" />

            <style>
            </style>

            <div class="section col-2">
                <push-button label="Home" icon="house-fill" for="home">
                </push-button>

                <push-button label="Gallery" icon="images" for="gallery">
                </push-button>

                <push-button label="Games" icon="joystick" for="games">
                </push-button>

                <push-button label="Settings" icon="sliders" for="settings">
                </push-button>
            </div>

            <div class="col-3" style="margin-top: 20%;">
                <div></div>
                    <push-button label="" icon="caret-up-fill" for="ArrowUp">
                    </push-button>
                <div></div>

                <div>
                    <push-button label="" icon="caret-left-fill" for="ArrowLeft">
                    </push-button>
                </div>
                <div></div>

                <div>
                    <push-button label="" icon="caret-right-fill" for="ArrowRight">
                    </push-button>
                </div>
                <div></div>

                <div>
                    <push-button label="" icon="caret-down-fill" for="ArrowDown">
                    </push-button>
                </div>
                <div></div>

                <div>
                    <div class="push-button" style="background-color: #cfeedd;" onclick="sendPush('exit')">
                        <span style="font-size: 1.5rem; color: red;">exit</span>
                    </div>
                </div>
                <div></div>

                <div>
                    <div class="push-button" style="background-color: #cfeedd;" onclick="sendPush('enter')">
                        <span style="font-size: 1.5rem; color: green;">enter</span>
                    </div>
                </div>
            </div>
        `;

        this.innerHTML = markup;

        if (typeof socket === 'undefined') {
            const socket = io();
        }

        if (typeof __boarderly === 'undefined') {
            const __boarderly = JSON.parse(localStorage.getItem('boarderly'));
        }

        // socket.emit('BUTTON_PUSHED', { button: this.getAttribute('for') })
    }

    connectedCallback() {
        if (!this.rendered ) {
            this.render();
            this.rendered = true;
        }
    }

    disconnectedCallback() {
        // the browser calls this method, when the element is removed from the document
        // (it can be called many times if an element is added/removed many times)
      }

    static get observedAttributes() {
       return ['name', 'class'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
       // this.render()
    }
}

customElements.define('bdly-dpad', DPad)