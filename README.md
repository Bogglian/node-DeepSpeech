# node-DeepSpeech [![npm](https://img.shields.io/npm/v/node-deepspeech.svg)](<(https://www.npmjs.com/package/node-deepspeech)>)

[![npm downloads](https://img.shields.io/npm/dm/node-deepspeech.svg)](https://www.npmjs.com/package/node-deepspeech)

[![NPM](https://nodei.co/npm/node-deepspeech.png)](https://npmjs.org/package/node-deepspeech)

## What is the node-DeepSpeech?

It started in Jan 23, 2019

this is component using node and morzilla/DeepSpeech.

## 💡 Motivation

No one made a valid repository for DeepSpeech and we made it.

## Git history by January 28, 2019

[![Git history by January 28, 2019](https://img.youtube.com/vi/EVFp4fMVJV0/0.jpg)](https://www.youtube.com/watch?v=EVFp4fMVJV0&feature=youtu.be)

## 🏃‍♀️🏃‍♂️QuickStart

1-1. If you want use in your project

```bash
$ yarn add node-deepspeech
// OR
$ npm install node-deepspeech
```

1-2. If you want use in local

```bash
// use HTTPS
$ git clone https://github.com/teamthesol/node-DeepSpeech.git
// Or use SSH
$ git clone git@github.com:teamthesol/node-DeepSpeech.git
```

2-1. if you have training models of deepspeech

Modify your training models directory name to 'models'. follow:

```
$ mv [your models name] [models name to be changed]
```

2-2 if you don't have training models of deepspeech, prepare files to be used in advance. follow:

```
$ npm run pre
```

3. edit .env file follw:

```md
Modify file name '.emv.sample's' to '.env'. this is use 'dotenv'.

Edit environment value 'DEEPSPEECH_MODEL_PATH' in '.env'. this is your 'models' path. 'models' is your trainint models. if you run 'npm run pre', edit like 'DEEPSPEECH_MODEL_PATH="./models'(this is only use in node-deepspeech).

but, if you don't want use 'dotenv', run `export DEEPSPEECH_MODEL_PATH="./your/models/path"` in terminal(bash, zsh, fish, etc).
```

4-1. If you want use in your project

write your project. Now the preparations that we can do are over!

4-2. If you want use in local

```bash
// run file-demo // or yarn file-demo
$ npm run file-demo
// run streaming-demo
$ npm run streaing demo // or yarn streaming-demo
```

## 🔧 Used Opensources

[mozila deepspeech](https://github.com/mozilla/DeepSpeech)(MPL 2.0)
[node](https://github.com/nodejs/node)(MIT)

## Script

| Title          | Description                                             |
| :------------- | :------------------------------------------------------ |
| file-demo      | runnung demo using the file path.                       |
| streaming-demo | running demo using the microphone.                      |
| pre            | install pre-information(audio sample, training models). |

## Development Environments

| Title                 | Description                   | Default  |
| :-------------------- | :---------------------------- | -------- |
| DEEPSPEECH_MODEL_PATH | your deepspeech 'models' path | ./models |

## Function

| Title       | Description                                        | Input                          |
| :---------- | :------------------------------------------------- | ------------------------------ |
| dsBuffer    | Mozilla/Deepspeech function using the buffer data. | buffer                         |
| dsFile      | Mozilla/Deepspeech function using the file path.   | file path                      |
| dsStreaming | Mozilla/Deepspeech function using the microphone.  | emmiter(use new EventEmitter() |

## Usage

The best example of using our service is [react-deepspeech](https://github.com/teamthesol/react-DeepSpeech).

## How can I contribute to this project?

First, read the [our contribution guideline](CONTRIBUTING.md). if you have read it, you can contribute to our project by creating [issues](https://github.com/teamthesol/node-DeepSpeech/issues) or contribute to it in [pull requests](https://github.com/teamthesol/node-DeepSpeech/pulls).

## License

[License](LICENSE)

```

```
