// Copyright 2021-2022 The Memphis Authors
// Licensed under the Apache License, Version 2.0 (the “License”);
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

export function getBorderRadius(radiusType) {
    switch (radiusType) {
        case 'circle':
            return '50px';
        case 'square':
            return '0px';
        case 'semi-round':
            return '5px';
        default:
            return '0px';
    }
}

export function getBorderColor(borderColorType) {
    switch (borderColorType) {
        case 'none':
            return 'transparent';
        case 'gray':
            return '#d8d8d8';
    }
}

export function getFontColor(colorType) {
    switch (colorType) {
        case 'none':
            return 'transparent';
        case 'black':
            return '#1D1D1D';
        case 'purple':
            return '#6557FF';
        case 'navy':
            return '#1D1D1D';
        case 'gray':
            return '#A9A9A9';
        case 'white':
            return '#f7f7f7';
        default:
            return '#6557FF';
    }
}

export function getBackgroundColor(backgroundColor) {
    switch (backgroundColor) {
        case 'purple':
            return '#6557FF';
        case 'white':
            return '#FFFFFF';
        case 'orange':
            return '#FFC633';
        case 'red':
            return '#CD5C5C';
        case 'navy':
            return '#1D1D1D';
        case 'turquoise':
            return '#5CA6A0';
        case 'black':
            return '#18171E';
        case 'gray':
            return '#A9A9A9';
        case 'none':
            return 'transparent';
        default:
            return '#F0F1F7';
    }
}

export function getBoxShadows(boxShadowsType) {
    switch (boxShadowsType) {
        case 'none':
            return 'transparent';
        case 'gray':
            return '0px 0px 2px 0px rgba(0,0,0,0.5)';
        case 'gray2':
            return '0px 1px 2px 0px rgba(0,0,0,0.5)';
        case 'login-input':
            return '0px 1px 2px 0px rgba(0,0,0,0.21)';
    }
}
