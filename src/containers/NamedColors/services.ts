export interface ColorInfo {
    family: string;
    htmlName: string;
    hexCode: string;
    rgbDecimal: string;
}

export function formatHexCode(c: ColorInfo) {
    return '#' + c.hexCode.split(' ').join('').toLowerCase();
}

export function formatRGB(c: ColorInfo) {
    return `rgb(${c.rgbDecimal.split(' ').join(',')})`;
}

export function applyFiltering(family?: string, filter?: string) {
    let results = NAMED_COLORS.slice();

    if (family && family !== '-') {
        results = results.filter(c => c.family === family);
    }

    if (filter) {
        const filterLowercase = filter.toLowerCase();

        results = results.filter(c => {
            const hexCode = formatHexCode(c);
            const rgbCode = formatRGB(c);
            return c.htmlName.toLowerCase().indexOf(filterLowercase) !== -1
                || rgbCode.toLowerCase().indexOf(filterLowercase) !== -1
                || hexCode.toLowerCase().indexOf(filterLowercase) !== -1;
        });
    }

    return results;
}

export const NAMED_COLORS: ColorInfo[] = [
    {
        family: 'Blue',
        htmlName: 'Navy',
        hexCode: '00 00 80',
        rgbDecimal: '0 0 128'
    },
    {
        family: 'Blue',
        htmlName: 'DarkBlue',
        hexCode: '00 00 8B',
        rgbDecimal: '0 0 139'
    },
    {
        family: 'Blue',
        htmlName: 'MediumBlue',
        hexCode: '00 00 CD',
        rgbDecimal: '0 0 205'
    },
    {
        family: 'Blue',
        htmlName: 'Blue',
        hexCode: '00 00 FF',
        rgbDecimal: '0 0 255'
    },
    {
        family: 'Blue',
        htmlName: 'MidnightBlue',
        hexCode: '19 19 70',
        rgbDecimal: '25 25 112'
    },
    {
        family: 'Blue',
        htmlName: 'RoyalBlue',
        hexCode: '41 69 E1',
        rgbDecimal: '65 105 225'
    },
    {
        family: 'Blue',
        htmlName: 'SteelBlue',
        hexCode: '46 82 B4',
        rgbDecimal: '70 130 180'
    },
    {
        family: 'Blue',
        htmlName: 'DodgerBlue',
        hexCode: '1E 90 FF',
        rgbDecimal: '30 144 255'
    },
    {
        family: 'Blue',
        htmlName: 'DeepSkyBlue',
        hexCode: '00 BF FF',
        rgbDecimal: '0 191 255'
    },
    {
        family: 'Blue',
        htmlName: 'CornflowerBlue',
        hexCode: '64 95 ED',
        rgbDecimal: '100 149 237'
    },
    {
        family: 'Blue',
        htmlName: 'SkyBlue',
        hexCode: '87 CE EB',
        rgbDecimal: '135 206 235'
    },
    {
        family: 'Blue',
        htmlName: 'LightSkyBlue',
        hexCode: '87 CE FA',
        rgbDecimal: '135 206 250'
    },
    {
        family: 'Blue',
        htmlName: 'LightSteelBlue',
        hexCode: 'B0 C4 DE',
        rgbDecimal: '176 196 222'
    },
    {
        family: 'Blue',
        htmlName: 'LightBlue',
        hexCode: 'AD D8 E6',
        rgbDecimal: '173 216 230'
    },
    {
        family: 'Blue',
        htmlName: 'PowderBlue',
        hexCode: 'B0 E0 E6',
        rgbDecimal: '176 224 230'
    },
    {
        family: 'Red',
        htmlName: 'DarkRed',
        hexCode: '8B 00 00',
        rgbDecimal: '139 0 0'
    },
    {
        family: 'Red',
        htmlName: 'Red',
        hexCode: 'FF 00 00',
        rgbDecimal: '255 0 0'
    },
    {
        family: 'Red',
        htmlName: 'Firebrick',
        hexCode: 'B2 22 22',
        rgbDecimal: '178 34 34'
    },
    {
        family: 'Red',
        htmlName: 'Crimson',
        hexCode: 'DC 14 3C',
        rgbDecimal: '220 20 60'
    },
    {
        family: 'Red',
        htmlName: 'IndianRed',
        hexCode: 'CD 5C 5C',
        rgbDecimal: '205 92 92'
    },
    {
        family: 'Red',
        htmlName: 'LightCoral',
        hexCode: 'F0 80 80',
        rgbDecimal: '240 128 128'
    },
    {
        family: 'Red',
        htmlName: 'Salmon',
        hexCode: 'FA 80 72',
        rgbDecimal: '250 128 114'
    },
    {
        family: 'Red',
        htmlName: 'DarkSalmon',
        hexCode: 'E9 96 7A',
        rgbDecimal: '233 150 122'
    },
    {
        family: 'Red',
        htmlName: 'LightSalmon',
        hexCode: 'FF A0 7A',
        rgbDecimal: '255 160 122'
    },
    {
        family: 'Pink',
        htmlName: 'MediumVioletRed',
        hexCode: 'C7 15 85',
        rgbDecimal: '199 21 133'
    },
    {
        family: 'Pink',
        htmlName: 'DeepPink',
        hexCode: 'FF 14 93',
        rgbDecimal: '255 20 147'
    },
    {
        family: 'Pink',
        htmlName: 'PaleVioletRed',
        hexCode: 'DB 70 93',
        rgbDecimal: '219 112 147'
    },
    {
        family: 'Pink',
        htmlName: 'HotPink',
        hexCode: 'FF 69 B4',
        rgbDecimal: '255 105 180'
    },
    {
        family: 'Pink',
        htmlName: 'LightPink',
        hexCode: 'FF B6 C1',
        rgbDecimal: '255 182 193'
    },
    {
        family: 'Pink',
        htmlName: 'Pink',
        hexCode: 'FF C0 CB',
        rgbDecimal: '255 192 203'
    },
    {
        family: 'Gray and black',
        htmlName: 'Black',
        hexCode: '00 00 00',
        rgbDecimal: '0 0 0'
    },
    {
        family: 'Gray and black',
        htmlName: 'DarkSlateGray',
        hexCode: '2F 4F 4F',
        rgbDecimal: '47 79 79'
    },
    {
        family: 'Gray and black',
        htmlName: 'DimGray',
        hexCode: '69 69 69',
        rgbDecimal: '105 105 105'
    },
    {
        family: 'Gray and black',
        htmlName: 'SlateGray',
        hexCode: '70 80 90',
        rgbDecimal: '112 128 144'
    },
    {
        family: 'Gray and black',
        htmlName: 'Gray',
        hexCode: '80 80 80',
        rgbDecimal: '128 128 128'
    },
    {
        family: 'Gray and black',
        htmlName: 'LightSlateGray',
        hexCode: '77 88 99',
        rgbDecimal: '119 136 153'
    },
    {
        family: 'Gray and black',
        htmlName: 'DarkGray',
        hexCode: 'A9 A9 A9',
        rgbDecimal: '169 169 169'
    },
    {
        family: 'Gray and black',
        htmlName: 'Silver',
        hexCode: 'C0 C0 C0',
        rgbDecimal: '192 192 192'
    },
    {
        family: 'Gray and black',
        htmlName: 'LightGray',
        hexCode: 'D3 D3 D3',
        rgbDecimal: '211 211 211'
    },
    {
        family: 'Gray and black',
        htmlName: 'Gainsboro',
        hexCode: 'DC DC DC',
        rgbDecimal: '220 220 220'
    },
    {
        family: 'White',
        htmlName: 'MistyRose',
        hexCode: 'FF E4 E1',
        rgbDecimal: '255 228 225'
    },
    {
        family: 'White',
        htmlName: 'AntiqueWhite',
        hexCode: 'FA EB D7',
        rgbDecimal: '250 235 215'
    },
    {
        family: 'White',
        htmlName: 'Linen',
        hexCode: 'FA F0 E6',
        rgbDecimal: '250 240 230'
    },
    {
        family: 'White',
        htmlName: 'Beige',
        hexCode: 'F5 F5 DC',
        rgbDecimal: '245 245 220'
    },
    {
        family: 'White',
        htmlName: 'WhiteSmoke',
        hexCode: 'F5 F5 F5',
        rgbDecimal: '245 245 245'
    },
    {
        family: 'White',
        htmlName: 'LavenderBlush',
        hexCode: 'FF F0 F5',
        rgbDecimal: '255 240 245'
    },
    {
        family: 'White',
        htmlName: 'OldLace',
        hexCode: 'FD F5 E6',
        rgbDecimal: '253 245 230'
    },
    {
        family: 'White',
        htmlName: 'AliceBlue',
        hexCode: 'F0 F8 FF',
        rgbDecimal: '240 248 255'
    },
    {
        family: 'White',
        htmlName: 'Seashell',
        hexCode: 'FF F5 EE',
        rgbDecimal: '255 245 238'
    },
    {
        family: 'White',
        htmlName: 'GhostWhite',
        hexCode: 'F8 F8 FF',
        rgbDecimal: '248 248 255'
    },
    {
        family: 'White',
        htmlName: 'Honeydew',
        hexCode: 'F0 FF F0',
        rgbDecimal: '240 255 240'
    },
    {
        family: 'White',
        htmlName: 'FloralWhite',
        hexCode: 'FF FA F0',
        rgbDecimal: '255 250 240'
    },
    {
        family: 'White',
        htmlName: 'Azure',
        hexCode: 'F0 FF FF',
        rgbDecimal: '240 255 255'
    },
    {
        family: 'White',
        htmlName: 'MintCream',
        hexCode: 'F5 FF FA',
        rgbDecimal: '245 255 250'
    },
    {
        family: 'White',
        htmlName: 'Snow',
        hexCode: 'FF FA FA',
        rgbDecimal: '255 250 250'
    },
    {
        family: 'White',
        htmlName: 'Ivory',
        hexCode: 'FF FF F0',
        rgbDecimal: '255 255 240'
    },
    {
        family: 'White',
        htmlName: 'White',
        hexCode: 'FF FF FF',
        rgbDecimal: '255 255 255'
    },
    {
        family: 'Purple, violet, and magenta',
        htmlName: 'Indigo',
        hexCode: '4B 00 82',
        rgbDecimal: '75 0 130'
    },
    {
        family: 'Purple, violet, and magenta',
        htmlName: 'Purple',
        hexCode: '80 00 80',
        rgbDecimal: '128 0 128'
    },
    {
        family: 'Purple, violet, and magenta',
        htmlName: 'DarkMagenta',
        hexCode: '8B 00 8B',
        rgbDecimal: '139 0 139'
    },
    {
        family: 'Purple, violet, and magenta',
        htmlName: 'DarkViolet',
        hexCode: '94 00 D3',
        rgbDecimal: '148 0 211'
    },
    {
        family: 'Purple, violet, and magenta',
        htmlName: 'DarkSlateBlue',
        hexCode: '48 3D 8B',
        rgbDecimal: '72 61 139'
    },
    {
        family: 'Purple, violet, and magenta',
        htmlName: 'BlueViolet',
        hexCode: '8A 2B E2',
        rgbDecimal: '138 43 226'
    },
    {
        family: 'Purple, violet, and magenta',
        htmlName: 'DarkOrchid',
        hexCode: '99 32 CC',
        rgbDecimal: '153 50 204'
    },
    {
        family: 'Purple, violet, and magenta',
        htmlName: 'Fuchsia',
        hexCode: 'FF 00 FF',
        rgbDecimal: '255 0 255'
    },
    {
        family: 'Purple, violet, and magenta',
        htmlName: 'Magenta',
        hexCode: 'FF 00 FF',
        rgbDecimal: '255 0 255'
    },
    {
        family: 'Purple, violet, and magenta',
        htmlName: 'SlateBlue',
        hexCode: '6A 5A CD',
        rgbDecimal: '106 90 205'
    },
    {
        family: 'Purple, violet, and magenta',
        htmlName: 'MediumSlateBlue',
        hexCode: '7B 68 EE',
        rgbDecimal: '123 104 238'
    },
    {
        family: 'Purple, violet, and magenta',
        htmlName: 'MediumOrchid',
        hexCode: 'BA 55 D3',
        rgbDecimal: '186 85 211'
    },
    {
        family: 'Purple, violet, and magenta',
        htmlName: 'MediumPurple',
        hexCode: '93 70 DB',
        rgbDecimal: '147 112 219'
    },
    {
        family: 'Purple, violet, and magenta',
        htmlName: 'Orchid',
        hexCode: 'DA 70 D6',
        rgbDecimal: '218 112 214'
    },
    {
        family: 'Purple, violet, and magenta',
        htmlName: 'Violet',
        hexCode: 'EE 82 EE',
        rgbDecimal: '238 130 238'
    },
    {
        family: 'Purple, violet, and magenta',
        htmlName: 'Plum',
        hexCode: 'DD A0 DD',
        rgbDecimal: '221 160 221'
    },
    {
        family: 'Purple, violet, and magenta',
        htmlName: 'Thistle',
        hexCode: 'D8 BF D8',
        rgbDecimal: '216 191 216'
    },
    {
        family: 'Purple, violet, and magenta',
        htmlName: 'Lavender',
        hexCode: 'E6 E6 FA',
        rgbDecimal: '230 230 250'
    },
    {
        family: 'Cyan',
        htmlName: 'Teal',
        hexCode: '00 80 80',
        rgbDecimal: '0 128 128'
    },
    {
        family: 'Cyan',
        htmlName: 'DarkCyan',
        hexCode: '00 8B 8B',
        rgbDecimal: '0 139 139'
    },
    {
        family: 'Cyan',
        htmlName: 'LightSeaGreen',
        hexCode: '20 B2 AA',
        rgbDecimal: '32 178 170'
    },
    {
        family: 'Cyan',
        htmlName: 'CadetBlue',
        hexCode: '5F 9E A0',
        rgbDecimal: '95 158 160'
    },
    {
        family: 'Cyan',
        htmlName: 'DarkTurquoise',
        hexCode: '00 CE D1',
        rgbDecimal: '0 206 209'
    },
    {
        family: 'Cyan',
        htmlName: 'MediumTurquoise',
        hexCode: '48 D1 CC',
        rgbDecimal: '72 209 204'
    },
    {
        family: 'Cyan',
        htmlName: 'Turquoise',
        hexCode: '40 E0 D0',
        rgbDecimal: '64 224 208'
    },
    {
        family: 'Cyan',
        htmlName: 'Aqua',
        hexCode: '00 FF FF',
        rgbDecimal: '0 255 255'
    },
    {
        family: 'Cyan',
        htmlName: 'Cyan',
        hexCode: '00 FF FF',
        rgbDecimal: '0 255 255'
    },
    {
        family: 'Cyan',
        htmlName: 'Aquamarine',
        hexCode: '7F FF D4',
        rgbDecimal: '127 255 212'
    },
    {
        family: 'Cyan',
        htmlName: 'PaleTurquoise',
        hexCode: 'AF EE EE',
        rgbDecimal: '175 238 238'
    },
    {
        family: 'Cyan',
        htmlName: 'LightCyan',
        hexCode: 'E0 FF FF',
        rgbDecimal: '224 255 255'
    },
    {
        family: 'Green',
        htmlName: 'DarkGreen',
        hexCode: '00 64 00',
        rgbDecimal: '0 100 0'
    },
    {
        family: 'Green',
        htmlName: 'Green',
        hexCode: '00 80 00',
        rgbDecimal: '0 128 0'
    },
    {
        family: 'Green',
        htmlName: 'DarkOliveGreen',
        hexCode: '55 6B 2F',
        rgbDecimal: '85 107 47'
    },
    {
        family: 'Green',
        htmlName: 'ForestGreen',
        hexCode: '22 8B 22',
        rgbDecimal: '34 139 34'
    },
    {
        family: 'Green',
        htmlName: 'SeaGreen',
        hexCode: '2E 8B 57',
        rgbDecimal: '46 139 87'
    },
    {
        family: 'Green',
        htmlName: 'Olive',
        hexCode: '80 80 00',
        rgbDecimal: '128 128 0'
    },
    {
        family: 'Green',
        htmlName: 'OliveDrab',
        hexCode: '6B 8E 23',
        rgbDecimal: '107 142 35'
    },
    {
        family: 'Green',
        htmlName: 'MediumSeaGreen',
        hexCode: '3C B3 71',
        rgbDecimal: '60 179 113'
    },
    {
        family: 'Green',
        htmlName: 'LimeGreen',
        hexCode: '32 CD 32',
        rgbDecimal: '50 205 50'
    },
    {
        family: 'Green',
        htmlName: 'Lime',
        hexCode: '00 FF 00',
        rgbDecimal: '0 255 0'
    },
    {
        family: 'Green',
        htmlName: 'SpringGreen',
        hexCode: '00 FF 7F',
        rgbDecimal: '0 255 127'
    },
    {
        family: 'Green',
        htmlName: 'MediumSpringGreen',
        hexCode: '00 FA 9A',
        rgbDecimal: '0 250 154'
    },
    {
        family: 'Green',
        htmlName: 'DarkSeaGreen',
        hexCode: '8F BC 8F',
        rgbDecimal: '143 188 143'
    },
    {
        family: 'Green',
        htmlName: 'MediumAquamarine',
        hexCode: '66 CD AA',
        rgbDecimal: '102 205 170'
    },
    {
        family: 'Green',
        htmlName: 'YellowGreen',
        hexCode: '9A CD 32',
        rgbDecimal: '154 205 50'
    },
    {
        family: 'Green',
        htmlName: 'LawnGreen',
        hexCode: '7C FC 00',
        rgbDecimal: '124 252 0'
    },
    {
        family: 'Green',
        htmlName: 'Chartreuse',
        hexCode: '7F FF 00',
        rgbDecimal: '127 255 0'
    },
    {
        family: 'Green',
        htmlName: 'LightGreen',
        hexCode: '90 EE 90',
        rgbDecimal: '144 238 144'
    },
    {
        family: 'Green',
        htmlName: 'GreenYellow',
        hexCode: 'AD FF 2F',
        rgbDecimal: '173 255 47'
    },
    {
        family: 'Green',
        htmlName: 'PaleGreen',
        hexCode: '98 FB 98',
        rgbDecimal: '152 251 152'
    },
    {
        family: 'Brown',
        htmlName: 'Maroon',
        hexCode: '80 00 00',
        rgbDecimal: '128 0 0'
    },
    {
        family: 'Brown',
        htmlName: 'Brown',
        hexCode: 'A5 2A 2A',
        rgbDecimal: '165 42 42'
    },
    {
        family: 'Brown',
        htmlName: 'SaddleBrown',
        hexCode: '8B 45 13',
        rgbDecimal: '139 69 19'
    },
    {
        family: 'Brown',
        htmlName: 'Sienna',
        hexCode: 'A0 52 2D',
        rgbDecimal: '160 82 45'
    },
    {
        family: 'Brown',
        htmlName: 'Chocolate',
        hexCode: 'D2 69 1E',
        rgbDecimal: '210 105 30'
    },
    {
        family: 'Brown',
        htmlName: 'DarkGoldenrod',
        hexCode: 'B8 86 0B',
        rgbDecimal: '184 134 11'
    },
    {
        family: 'Brown',
        htmlName: 'Peru',
        hexCode: 'CD 85 3F',
        rgbDecimal: '205 133 63'
    },
    {
        family: 'Brown',
        htmlName: 'RosyBrown',
        hexCode: 'BC 8F 8F',
        rgbDecimal: '188 143 143'
    },
    {
        family: 'Brown',
        htmlName: 'Goldenrod',
        hexCode: 'DA A5 20',
        rgbDecimal: '218 165 32'
    },
    {
        family: 'Brown',
        htmlName: 'SandyBrown',
        hexCode: 'F4 A4 60',
        rgbDecimal: '244 164 96'
    },
    {
        family: 'Brown',
        htmlName: 'Tan',
        hexCode: 'D2 B4 8C',
        rgbDecimal: '210 180 140'
    },
    {
        family: 'Brown',
        htmlName: 'Burlywood',
        hexCode: 'DE B8 87',
        rgbDecimal: '222 184 135'
    },
    {
        family: 'Brown',
        htmlName: 'Wheat',
        hexCode: 'F5 DE B3',
        rgbDecimal: '245 222 179'
    },
    {
        family: 'Brown',
        htmlName: 'NavajoWhite',
        hexCode: 'FF DE AD',
        rgbDecimal: '255 222 173'
    },
    {
        family: 'Brown',
        htmlName: 'Bisque',
        hexCode: 'FF E4 C4',
        rgbDecimal: '255 228 196'
    },
    {
        family: 'Brown',
        htmlName: 'BlanchedAlmond',
        hexCode: 'FF EB CD',
        rgbDecimal: '255 235 205'
    },
    {
        family: 'Brown',
        htmlName: 'Cornsilk',
        hexCode: 'FF F8 DC',
        rgbDecimal: '255 248 220'
    },
    {
        family: 'Yellow',
        htmlName: 'DarkKhaki',
        hexCode: 'BD B7 6B',
        rgbDecimal: '189 183 107'
    },
    {
        family: 'Yellow',
        htmlName: 'Gold',
        hexCode: 'FF D7 00',
        rgbDecimal: '255 215 0'
    },
    {
        family: 'Yellow',
        htmlName: 'Khaki',
        hexCode: 'F0 E6 8C',
        rgbDecimal: '240 230 140'
    },
    {
        family: 'Yellow',
        htmlName: 'PeachPuff',
        hexCode: 'FF DA B9',
        rgbDecimal: '255 218 185'
    },
    {
        family: 'Yellow',
        htmlName: 'Yellow',
        hexCode: 'FF FF 00',
        rgbDecimal: '255 255 0'
    },
    {
        family: 'Yellow',
        htmlName: 'PaleGoldenrod',
        hexCode: 'EE E8 AA',
        rgbDecimal: '238 232 170'
    },
    {
        family: 'Yellow',
        htmlName: 'Moccasin',
        hexCode: 'FF E4 B5',
        rgbDecimal: '255 228 181'
    },
    {
        family: 'Yellow',
        htmlName: 'PapayaWhip',
        hexCode: 'FF EF D5',
        rgbDecimal: '255 239 213'
    },
    {
        family: 'Yellow',
        htmlName: 'LightGoldenrodYellow',
        hexCode: 'FA FA D2',
        rgbDecimal: '250 250 210'
    },
    {
        family: 'Yellow',
        htmlName: 'LemonChiffon',
        hexCode: 'FF FA CD',
        rgbDecimal: '255 250 205'
    },
    {
        family: 'Yellow',
        htmlName: 'LightYellow',
        hexCode: 'FF FF E0',
        rgbDecimal: '255 255 224'
    },
    {
        family: 'Orange',
        htmlName: 'OrangeRed',
        hexCode: 'FF 45 00',
        rgbDecimal: '255 69 0'
    },
    {
        family: 'Orange',
        htmlName: 'Tomato',
        hexCode: 'FF 63 47',
        rgbDecimal: '255 99 71'
    },
    {
        family: 'Orange',
        htmlName: 'DarkOrange',
        hexCode: 'FF 8C 00',
        rgbDecimal: '255 140 0'
    },
    {
        family: 'Orange',
        htmlName: 'Coral',
        hexCode: 'FF 7F 50',
        rgbDecimal: '255 127 80'
    },
    {
        family: 'Orange',
        htmlName: 'Orange',
        hexCode: 'FF A5 00',
        rgbDecimal: '255 165 0'
    },
];

export const FAMILY_NAMES = NAMED_COLORS
    .reduce((acc, colorInfo) => {
        if (acc.indexOf(colorInfo.family) === -1) {
            acc.push(colorInfo.family);
        }
        return acc;
    }, [] as string[])
    .sort();
