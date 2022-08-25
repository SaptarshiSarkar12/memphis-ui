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

export const INSTALLATION_GUIDE = {
    Main: {
        header: 'Installation',
        description: (
            <span>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature <a>Learn More</a>
            </span>
        )
    },
    Kubernetes: {
        header: 'Installation/Kubernetes',
        description: (
            <span>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature <a>Learn More</a>
            </span>
        ),
        StepOneTitle: 'Step 1 - Copy&Paste to your terminal',
        StepOneCommand: `helm repo add memphis https://k8s.memphis.dev/charts/&&
        helm install my-memphis memphis/memphis --create-namespace --namespace memphis`,
        StepTwoTitle: 'Step 2 - Expose memphis to your localhost',
        StepTwoCommand: `$# kubectl port-forward service/memphis-ui 9000:80 --namespace memphis & >/dev/null`,
        StepThreeTitle: `Step 3 - Open memphis ${(<a>UI</a>)}`,
        StepThreeCommand: `http://localhost:9000`
    },
    'Docker Compose': {
        header: 'Installation/Docker',
        description: (
            <span>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature <a>Learn More</a>
            </span>
        ),
        StepOneTitle: 'Step 1 - Copy&Paste to your terminal',
        StepOneCommand: `curl -s https://memphisdev.github.io/memphis-docker/docker-compose.yml -o docker-compose.yml && 
        docker compose -f docker-compose.yml -p memphis up`,
        StepTwoTitle: `Step 3 - Open memphis ${(<a>UI</a>)}`,
        StepTwoCommand: `http://localhost:9000`
    },
    'Cloud Providers': {
        header: 'Installation/Docker',
        description: (
            <span>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature <a>Learn More</a>
            </span>
        ),
        StepOneTitle: 'Step 1 - Copy&Paste to your terminal',
        StepOneCommand: `curl -s https://memphisdev.github.io/memphis-docker/docker-compose.yml -o docker-compose.yml && 
        docker compose -f docker-compose.yml -p memphis up`,
        StepTwoTitle: `Step 3 - Open memphis ${(<a>UI</a>)}`,
        StepTwoCommand: `http://localhost:9000`
    }
};
