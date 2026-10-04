import React, { useEffect, useState } from 'react';
import {
    SafeAreaView, ScrollView, View, Text, TextInput,
    TouchableOpacity, StyleSheet, StatusBar,
} from 'react-native';
import { priceList, salesAccounting } from './data';

const money = (v) =>
    Number(v).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const dateRu = (v) => v.slice(0, 10).split('-').reverse().join('.');

// Список товаров, проданных после даты (iso = ГГГГ-ММ-ДД), по алфавиту
function buildReport(iso) {
    const map = {};
    salesAccounting
        .filter((r) => r.sale_date > iso)
        .forEach((r) => {
            const p = priceList.find((x) => x.product_code === r.product_code);
            if (!p) return;
            if (!map[p.product_code]) {
                map[p.product_code] = { product_name: p.product_name, price: p.unit_price, total_quantity: 0, total_revenue: 0 };
            }
            map[p.product_code].total_quantity += r.quantity_sold;
            map[p.product_code].total_revenue += r.total_cost;
        });
    return Object.values(map).sort((x, y) => x.product_name.localeCompare(y.product_name, 'ru'));
}

// Универсальная таблица: columns = [{title, flex, num}], rows = массив массивов
function Table({ columns, rows, footer }) {
    return (
        <View style={s.table}>
            <View style={[s.row, s.head]}>
                {columns.map((c, i) => (
                    <Text key={i} style={[s.cell, s.headText, { flex: c.flex }, c.num && s.num]}>{c.title}</Text>
                ))}
            </View>
            {rows.map((r, i) => (
                <View key={i} style={s.row}>
                    {r.map((v, j) => (
                        <Text key={j} style={[s.cell, { flex: columns[j].flex }, columns[j].num && s.num]}>{v}</Text>
                    ))}
                </View>
            ))}
            {footer}
        </View>
    );
}

export default function App() {
    const [date, setDate] = useState('');          // ДД.ММ.ГГГГ
    const [report, setReport] = useState(null);
    const [message, setMessage] = useState('');
    const show = () => {
        setMessage('');
        setReport(null);
        const m = date.trim().match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
        if (!m) {
            setMessage('Введите дату в формате ДД.ММ.ГГГГ');
            return;
        }
        const iso = m[3] + '-' + m[2].padStart(2, '0') + '-' + m[1].padStart(2, '0');
        const records = buildReport(iso);
        if (records.length === 0) {
            setMessage('Товары, реализованные после указанной даты, не найдены');
            return;
        }
        setReport(records);
    };

    const total = report ? report.reduce((sum, r) => sum + Number(r.total_revenue), 0) : 0;

    return (
        <SafeAreaView style={s.screen}>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={s.content}>
                <Text style={s.h1}>Товары, реализованные после указанной даты</Text>

                <View style={s.form}>
                    <TextInput
                        style={s.input}
                        value={date}
                        onChangeText={setDate}
                        placeholder="ДД.ММ.ГГГГ"
                        keyboardType="numbers-and-punctuation"
                    />
                    <TouchableOpacity style={s.button} onPress={show}>
                        <Text style={s.buttonText}>Показать</Text>
                    </TouchableOpacity>
                </View>

                {message !== '' && <Text style={s.message}>{message}</Text>}

                {report && (
                    <>
                        <Text style={s.h2}>Список реализованных товаров</Text>
                        <Table
                            columns={[
                                { title: '№', flex: 0.6, num: true },
                                { title: 'Товар', flex: 2.4 },
                                { title: 'Кол-во', flex: 1, num: true },
                                { title: 'Цена', flex: 1.4, num: true },
                                { title: 'Выручка', flex: 1.6, num: true },
                            ]}
                            rows={report.map((r, i) => [
                                i + 1, r.product_name, r.total_quantity, money(r.price), money(r.total_revenue),
                            ])}
                            footer={
                                <View style={s.row}>
                                    <Text style={[s.cell, s.bold, { flex: 5.4 }]}>Итого</Text>
                                    <Text style={[s.cell, s.bold, s.num, { flex: 1.6 }]}>{money(total)}</Text>
                                </View>
                            }
                        />
                    </>
                )}

                <Text style={s.h2}>Прейскурант цен</Text>
                <Table
                    columns={[
                        { title: '№', flex: 0.6, num: true },
                        { title: 'Код', flex: 0.9, num: true },
                        { title: 'Наименование', flex: 2.6 },
                        { title: 'Цена', flex: 1.4, num: true },
                    ]}
                    rows={priceList.map((r) => [r.serial_no, r.product_code, r.product_name, money(r.unit_price)])}
                />

                <Text style={s.h2}>Учет реализации товаров</Text>
                <Table
                    columns={[
                        { title: '№', flex: 0.5, num: true },
                        { title: 'Дата', flex: 1.4 },
                        { title: 'Код', flex: 0.8, num: true },
                        { title: 'Товар', flex: 2 },
                        { title: 'Кол', flex: 0.7, num: true },
                        { title: 'Стоимость', flex: 1.4, num: true },
                    ]}
                    rows={salesAccounting.map((r) => [
                        r.sale_id, dateRu(r.sale_date), r.product_code, r.product_name, r.quantity_sold, money(r.total_cost),
                    ])}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    screen: { flex: 1, backgroundColor: '#fff', paddingTop: StatusBar.currentHeight || 0 },
    content: { padding: 15 },
    h1: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
    h2: { fontSize: 17, fontWeight: 'bold', marginTop: 25, marginBottom: 8 },
    form: { flexDirection: 'row', alignItems: 'center' },
    input: { flex: 1, borderWidth: 1, borderColor: '#999', padding: 8, fontSize: 16, marginRight: 10 },
    button: { backgroundColor: '#eee', borderWidth: 1, borderColor: '#999', padding: 10 },
    buttonText: { fontSize: 16 },
    message: { color: '#b00', marginTop: 12 },
    table: { borderTopWidth: 1, borderLeftWidth: 1, borderColor: '#999' },
    row: { flexDirection: 'row' },
    head: { backgroundColor: '#eee' },
    cell: { padding: 5, fontSize: 12, borderRightWidth: 1, borderBottomWidth: 1, borderColor: '#999' },
    headText: { fontWeight: 'bold' },
    num: { textAlign: 'right' },
    bold: { fontWeight: 'bold' },
});
