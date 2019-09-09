'use strict';

const instrumentKeys = [
    "osc1_oct",
    "osc1_det",
    "osc1_detune",
    "osc1_xenv",
    "osc1_vol",
    "osc1_waveform",
    "osc2_oct",
    "osc2_det",
    "osc2_detune",
    "osc2_xenv",
    "osc2_vol",
    "osc2_waveform",
    "noise_fader",
    "env_attack",
    "env_sustain",
    "env_release",
    "env_master",
    "fx_filter",
    "fx_freq",
    "fx_resonance",
    "fx_delay_time",
    "fx_delay_amt",
    "fx_pan_freq",
    "fx_pan_amt",
    "lfo_osc1_freq",
    "lfo_fx_freq",
    "lfo_freq",
    "lfo_amt",
    "lfo_waveform"
];

module.exports = {
    'apply': s => {
        const content = JSON.parse(s);

        return JSON.stringify(instrumentKeys.map(key => {
            return content[key];
        }));
    },
    'revert': function(arr) {
        const instrumentKeys = [
            "osc1_oct",
            "osc1_det",
            "osc1_detune",
            "osc1_xenv",
            "osc1_vol",
            "osc1_waveform",
            "osc2_oct",
            "osc2_det",
            "osc2_detune",
            "osc2_xenv",
            "osc2_vol",
            "osc2_waveform",
            "noise_fader",
            "env_attack",
            "env_sustain",
            "env_release",
            "env_master",
            "fx_filter",
            "fx_freq",
            "fx_resonance",
            "fx_delay_time",
            "fx_delay_amt",
            "fx_pan_freq",
            "fx_pan_amt",
            "lfo_osc1_freq",
            "lfo_fx_freq",
            "lfo_freq",
            "lfo_amt",
            "lfo_waveform"
        ];
        const res = {};
        instrumentKeys.forEach((key, i) => res[key] = arr[i]);
        return res;
    }
};
