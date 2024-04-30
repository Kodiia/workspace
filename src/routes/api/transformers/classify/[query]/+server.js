//import { serializeNonPOJOs } from '$lib/utils';
import { pipeline, env } from '@xenova/transformers';
env.allowLocalModels = false;

export async function GET({ locals, params }) {

    try {
        const prompt = params.query;

        let searchTerms = []
        let classificator = await pipeline(
            "zero-shot-classification",
            "Xenova/mobilebert-uncased-mnli",
        );
        // labels should all be lowercase for correct search

        const technologies = ['html', 'css', 'javascript', 'p5js', 'threejs', 'brainjs']
        const fields = ['web development', '2d graphics', '3d graphics', 'train neural network']

        const labelsGroups = {
            html: ['structure', 'heading', 'text', 'button', 'link', 'image', 'table', 'form', 'semantic', 'media', 'embed', 'script', 'style', 'code', 'group', 'graphics'],
            css: ['size', 'box', 'positioning', 'display', 'flexbox', 'grid', 'font', 'text', 'color', 'opacity', 'shadow', 'cursor', 'animation', 'selectors'],
            javascript: ['dom', 'event', 'asynchronous', 'conditionals', 'loops', 'switch', 'functions', 'variables', 'arrays', 'objects', 'import', 'browser'],
            p5js: ['about', 'drawing', 'color', 'image', 'text', 'transform', 'input', 'animation', 'math', 'sound', 'video', 'file', 'time'],
            threejs: ['about', 'scene', 'camera', 'render', 'create', 'geometry', 'material', 'light', 'controls', 'load'],
            brainjs: ['about', 'create', 'train', 'predict', 'configure', 'visualize', 'export', 'load']
        }

        const labelGroupKeywords = {
            html: {
                about: ['about'],
                structure: ['doctype', 'html', 'head', 'title', 'body'],
                heading: ['heading'],
                text: ['paragraph', 'ordered', 'unordered', 'item', 'list'],
                button: ['button'],
                link: ['link'],
                image: ['image'],
                table: ['table', 'caption', 'row', 'data'],
                form: ['form', 'input', 'textarea', 'select', 'option', 'label', 'button'],
                semantic: ['article', 'section', 'nav', 'header', 'footer', 'main', 'figure', 'caption'],
                media: ['audio', 'video'],
                embed: ['iframe'],
                script: ['script'],
                style: ['style', 'bold', 'italic', 'underscore', 'strikethrough'],
                code: ['code'],
                group: ['block', 'break', 'new', 'group', 'span'],
                graphics: ['canvas']
            },
            css: {
                about: ['about'],
                size: ['width', 'height'],
                box: ['margin', 'padding', 'border', 'offset'],
                positioning: ['forward', 'backward', 'top', 'right', 'left', 'bottom', 'absolute', 'fixed'],
                display: ['display', 'overflow'],
                flexbox: ['flex', 'direction'],
                grid: ['grid', 'columns', 'rows'],
                font: ['family', 'style', 'weight', 'bold', 'size'],
                text: ['align'],
                color: ['color', 'background'],
                shadow: ['box-shadow'],
                cursor: ['pointer', 'shape'],
                opacity: ['rgba', 'opacity', 'hsla'],
                animation: ['transition', 'animation', 'key'],
                selectors: ['id', 'class'],
            },
            javascript: {
                about: ['about'],
                dom: ['id', 'create', 'append', 'add', 'remove', 'set'],
                event: ['add', 'click', 'hover', 'press', 'over', 'remove'],
                asynchronous: ['async', 'fetch', 'await', 'timeout', 'interval'],
                conditionals: ['if', 'else'],
                loops: ['for', 'while', 'do', 'break'],
                switch: ['switch', 'case'],
                functions: ['function', 'arrow'],
                variables: ['var', 'let', 'constant', 'this', 'increment', 'variable'],
                arrays: ['array', 'filter', 'find', 'search', 'add', 'remove'],
                objects: ['key', 'search'],
                import: ['import'],
                browser: ['window', 'document', 'navigator', 'storage']
            },
            p5js: {
                about: ['about'],
                drawing: ['cavas', 'line', 'rectangle', 'ellipse', 'arc', 'triangle', 'circle', 'square', 'grid'],
                color: ['fill', 'border', 'stroke', 'width', 'background'],
                image: ['load', 'image', 'pixels'],
                text: ['text', 'font', 'size'],
                transform: ['translate', 'rotate', 'push', 'pop'],
                input: ['mouse', 'mouseX', 'mouseY', 'pressed', 'key'],
                animation: ['frames', 'noLoop', 'stop', 'rate', 'count'],
                math: ['random', 'noise', 'map', 'sin', 'cos'],
                sound: ['load', 'play', 'pause', 'stop'],
                video: ['create', 'load'],
                file: ['gif', 'save'],
                time: ['millis', 'second', 'minute', 'hour']
            },
            threejs: {
                about: ['about'],
                scene: ['scene', 'add', 'remove'],
                camera: ['perspective', 'orthographic', 'position'],
                render: ['render', 'size', 'ratio'],
                create: ['box', 'plane', 'sphere', 'torus', 'particle', 'line', 'skybox', 'mesh'],
                geometry: ['box', 'plane', 'sphere', 'torus'],
                material: ['normal', 'standard', 'basic', 'texture'],
                light: ['ambient', 'hemisphere', 'background', 'point', 'directional', 'sound'],
                controls: ['orbit', 'first person', 'fly'],
                load: ['loader', 'gltf']
            },
            brainjs: {
                about: ['about'],
                create: ['neural network', 'lstm', 'recurrent'],
                train: ['train', 'async'],
                predict: ['predict', 'run'],
                configure: ['properties', 'settings', 'options'],
                visualize: ['svg'],
                export: ['function', 'json', 'serialize'],
                load: ['function', 'json', 'deserialize']
            }
        }

        async function getPredictedTechnology() {
            const technologiesClassificationResult = await classificator(prompt, technologies);
            let predictedTechnology = technologiesClassificationResult.labels[0]
            console.log(technologiesClassificationResult)

            if (technologiesClassificationResult.scores[0] < 0.5) {
                const fieldsClassificationResult = await classificator(prompt, fields);
                console.log(fieldsClassificationResult)
                const predictedField = fieldsClassificationResult.labels[0]
                console.log(predictedField)
                if (predictedField === 'web development') {
                    const technologiesClassificationResult = await classificator(prompt, ['html', 'css', 'javascript']);
                    predictedTechnology = technologiesClassificationResult.labels[0]
                } else if (predictedField === '2d graphics') {
                    predictedTechnology = 'p5js'
                } else if (predictedField === '3d graphics') {
                    predictedTechnology = 'threejs'
                } else if (predictedField === 'train neural network') {
                    predictedTechnology = 'brainjs'
                }

                console.log(predictedTechnology)
            }

            return predictedTechnology
        }

        async function getLabelsGroup(technology = '') {
            let predictedLabelsGroup = ''
            const labelsGroupClassificationResult = await classificator(prompt, labelsGroups[technology]);
            predictedLabelsGroup = labelsGroupClassificationResult.labels[0]

            console.log(labelsGroupClassificationResult)
            return predictedLabelsGroup;
        }

        async function getLabelGroupKeywords(technology = '', group = '') {
            const keywordsList = labelGroupKeywords[technology][group]
            const labelsGroupKeywordsClassificationResult = await classificator(prompt, keywordsList);
            const predictedLabelsGroupKeywrods = labelsGroupKeywordsClassificationResult.labels[0]
            return predictedLabelsGroupKeywrods
        }

        let predictedTechnology = await getPredictedTechnology()
        let predictedLabelsGroup = await getLabelsGroup(predictedTechnology)
        let predictedLabelsGroupKeywords = await getLabelGroupKeywords(predictedTechnology, predictedLabelsGroup)

        const searchTermsObject = {
            technology: predictedTechnology,
            labelGroup: predictedLabelsGroup,
            keywords: predictedLabelsGroupKeywords,
            searchTerms: `${predictedTechnology}&&${predictedLabelsGroup}&&${predictedLabelsGroupKeywords}`
        }

        console.log(searchTermsObject)

        return new Response(JSON.stringify(searchTermsObject))

    } catch (err) {
        console.log(err)
    }
}

