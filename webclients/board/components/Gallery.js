class Gallery extends HTMLElement {
    render() {
        function buildAlbumList(data) {
            let pic_markup = '';
            let a = [];
        
            data.forEach(function(o) {
                let album_name = o.album;
        
                if (!a.includes(album_name)) {
                    a.push(album_name);
                }
        
                pic_markup += getPicMarkup(o.album, o.name);
            });
           
            __pictures_block.innerHTML = pic_markup;
        }
        
        function getPicMarkup(album, name) {
            let markup = `<img src="/albums/${album}/${name}" />`;
        
            return markup;
        }

        if (typeof socket === 'undefined') {
            const socket = io();
        }

        socket.emit('GET_ALBUMS');
        socket.on('GET_ALBUMS', buildAlbumList);

        let markup = `
            <style>
            .gallery {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                box-shadow: 
                  0 0 10px #0002,
                  0 20px 40px -20px #0004;
                width: 70%;
                height: 90%;
                background: #fff;
                border: 6px solid #fff;
                display: grid;
                grid-template-rows: 50% 50%;
                grid-template-columns: 1fr 1fr;
                overflow: hidden;
                gap: 6px;
            }
              
              .gallery img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
              
              @keyframes moveHorizontal {
                to {
                  object-position: 100% 0;
                }
              }
              
              @keyframes moveVertical {
                to {
                  object-position: 0 100%;
                }
              }
              
              @keyframes shrinkVertical {
                to {
                  height: 0;
                }
              }
              
              @keyframes shrinkHorizontal {
                to {
                  width: 0;
                }
              }
              
              @keyframes growHorizontal {
                to {
                  width: 100%;
                }
              }
              @keyframes growHorizontal2 {
                to {
                  width: 70%;
                }
              }
              
              @keyframes growVertical {
                to {
                  height: 100%;
                }
              }
              
              @keyframes growAll {
                to {
                  width: 100%;
                  height: 100%;
                }
              }
              
              .gallery img:nth-child(1) {
                grid-column: 1;
                grid-row: 1;
                justify-self: end;
                animation: 
                  moveHorizontal 8.5s 0.5s 1,
                  shrinkHorizontal 2s 9s ease-in 1;
                animation-fill-mode: forwards;
              }
              
              .gallery img:nth-child(2) {
                grid-column: 2;
                grid-row: 1;
                justify-self: end;
                animation: 
                  shrinkHorizontal 2s 11s 1;
                animation-fill-mode: forwards;
              }
              
              .gallery img:nth-child(3) {
                grid-row: 2;
                grid-column: 1 / 3;
                align-self: end;
                object-position: 0 0;
                animation:
                  moveVertical 5s 1s 1,
                  shrinkVertical 3s 5s 1;
                animation-fill-mode: forwards;
              }
              
              .gallery img:nth-child(4) {
                grid-column: 1 / 3;
                grid-row: 1;
                width: 0;
                justify-self: center;
                align-self: start;
                animation: 
                  growHorizontal 2.25s 11s 1,
                  moveHorizontal 4s 14s 1,
                  shrinkVertical 2s 18s 1;
                animation-fill-mode: forwards;
              }
              
              .gallery img:nth-child(5) {
                grid-column: 1;
                grid-row: 2;
                width: 0;
                justify-self: start;
                align-self: end;
                animation: 
                  growHorizontal 2.5s 7.5s 1,
                  moveVertical 4s 12.5s 1,
                  shrinkHorizontal 2s 17s 1;;
                animation-fill-mode: forwards;
              }
              
              .gallery img:nth-child(6) {
                grid-column: 2;
                grid-row: 2;
                width: 0;
                justify-self: end;
                align-self: end;
                animation: 
                  growHorizontal 2s 8s 1,
                  shrinkHorizontal 2s 17s 1;
                animation-fill-mode: forwards;
              }
              
              .gallery img:nth-child(7) {
                grid-column: 1/3;
                grid-row: 1/3;
                width: 0;
                justify-self: end;
                align-self: end;
                object-position: 0 0;
                animation: 
                  growHorizontal 2s 20s 1,
                  moveHorizontal 16s 21.5s 1;
                animation-fill-mode: forwards;
              }
            </style>

            <div id="gallery_modal" class="">
                <div id="__pictures_block" class="gallery"></div>
            </div>
        `;

        this.innerHTML = markup;
    }

    connectedCallback() {
        if (!this.rendered) {
            this.render();
            this.rendered = true;
        }
    }

    static get observedAttributes() {
        return ['name', 'class'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }
}

customElements.define('bdly-gallery', Gallery);