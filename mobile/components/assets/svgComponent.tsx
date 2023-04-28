import * as React from "react"
import { SvgXml} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

const SvgComponent = () => {
    const svgMarkup = '<svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" width="157px" height="157px"' +
        '     viewBox="0 0 512.00 512.00" xml:space="preserve" fill="#fff" stroke="#000000"' +
        '     stroke-width="0.00512">' +
        '<g id="SVGRepo_bgCarrier" stroke-width="0"/>' +
        '<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="2.048"/>' +
        '<g id="SVGRepo_iconCarrier"> <style type="text/css">  .st0{fill:#fff;}  </style> <g> <polygon class="st0" points="99.011,429.998 131.198,463.904 248.214,352.811 214.261,320.576 "/> <path class="st0" d="M491.495,89.592c-32.844-34.594-94.078-29.781-133.172,7.328c-23.766,22.578-34.141,53.672-34.219,79.734 c-0.063,22.891-1.906,38.656-19.672,58.328l-23.281,22.109l33.938,32.234l21.531-20.453c20.547-16.719,36.406-17.75,59.25-16.625 c26.031,1.266,57.641-7.469,81.422-30.047C516.354,185.092,524.354,124.186,491.495,89.592z"/> <path class="st0" d="M219.526,190.061c2.234-24.5,1.078-41.719-34.531-75.281c0,0-40.797-38.734-63.875-60.656 c-19.297-18.313-46.688,9.203-26.953,27.953l66.922,63.516c4.266,4.063,4.438,10.813,0.391,15.078l-1.969,2.078 c-4.047,4.266-10.813,4.438-15.078,0.375L77.214,99.326c-11.031-10.484-21.375-6.188-28.125,0.922 c-6.75,7.125-10.5,17.656,0.531,28.141l67.219,63.813c4.281,4.047,4.438,10.813,0.391,15.078l-1.969,2.063 c-4.063,4.281-10.813,4.453-15.078,0.406l-66.906-63.531c-19.75-18.75-45.797,10.031-26.5,28.328 c23.078,21.938,63.875,60.672,63.875,60.672c35.359,33.828,52.609,34.094,76.969,30.578c19.609-2.828,33.875-7.625,55.969,13.375 l194.578,184.734l32.188-33.891l-194.578-184.75C213.667,224.279,217.729,209.795,219.526,190.061z"/> </g> </g> ' +
        '</svg>'

    const SvgImage = () => <SvgXml xml={svgMarkup} />
    return <SvgImage />
}

export default SvgComponent