<template>
    <div class="ht-container">
        <div class="ht-header">
            <span class="ht-fs-20">数据概况</span>
            <span class="ht-fs-12">数据更新至{{today}}</span>
        </div>
        <div class="ht-search">
            <div class="ht-search-line"></div>
            <div class="ht-search-window">
                <div class="ht-search-btn ht-fs-14" v-for="(t, index) in timeData" :key="index" @click="getTimeQuantumData(index)">
                    <span class="ht-c-sE">{{t}}</span>
                </div>
            </div>
        </div>
        <div class="ht-nav">
            <div class="ht-nav-column" v-for="i in enterData" :key="i.name">
                <span class="ht-fs-14 ht-c-sE">{{i.name}}</span>
                <span class="ht-fs-18">{{i.value}}</span>
            </div>
            <div class="ht-nav-column" v-for="j in outData" :key="j.name">
                <span class="ht-fs-14 ht-c-sE">{{j.name}}</span>
                <span class="ht-fs-18">{{j.value}}</span>
            </div>            
        </div>
        <div class="ht-main">
            <div class="ht-main-subtitle">
                <span class="ht-fs-20">趋势分析</span>
                <span class="ht-fs-12">数据由智慧展务提供</span>
            </div>
            <div class="ht-main-row">
                <line-get-in></line-get-in>
            </div>
            <div class="ht-main-row">
                <line-get-out></line-get-out>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import GetInLine from '../components/getInLine.vue';
    import GetOutLine from '../components/getOutLine.vue';
    import { setInterval } from 'timers';

    export default {
    name: 'HumanTraffic',
    components: {
        'line-get-in': GetInLine,
        'line-get-out': GetOutLine
    },
    data() {
        return {
        today: this.getNowFormatDate(),
        timeData: [],
        enterData: [],
        outData: []
        };
    },
    created() {
        this.getCreditCheckDate();
        this.updateDataIn();
        this.updateDataOut();
    },
    mounted() {
        setInterval(() => {
        this.updateDataIn();
        this.updateDataOut();
        }, 60000);
    },
    methods: {
        getCreditCheckDate() {
            var that = this;
            axios({
                method: 'GET',
                url: that.baseUrl + 'api/report/getCreditCheckDate/' + that.$route.query.st
            }).then(res => {
                // console.log('getCreditCheckDate', res)
                that.timeData = res.data.Data.reverse();
            });
        },
        updateDataIn(t) {
            let that = this;
            let date = t || that.getNowFormatDate();
            axios({
                method: 'POST',
                url: that.baseUrl + 'api/Report/GetTimeIn',
                data: {
                DateLine: date,
                ST: that.$route.query.st
                }
            }).then(res => {
                // console.log('updateDataIn', res)
                that.enterData = res.data;
            });
        },
        updateDataOut(t) {
            let that = this;
            let date = t || that.getNowFormatDate();
            axios({
                method: 'POST',
                url: that.baseUrl + 'api/Report/GetTimeOut',
                data: {
                DateLine: date,
                ST: that.$route.query.st
                }
            }).then(res => {
                // console.log('updateDataOut', res)
                that.outData = res.data;
            });
        },
        getTimeQuantumData(index) {
            let time = this.timeData[index];
            this.updateDataIn(time);
            this.updateDataOut(time);
        }
    }
    };
</script>

<style>
    @import "../assets/css/humanTraffic2.css";
</style>
