# Tic-Tac-Toe

เกม XO หรือที่รู้จักกันว่า Tic-Tac-Toe เป็นเกมกระดานสำหรับผู้เล่นสองคน โดยผู้เล่นจะใช้สัญลักษณ์ "X" และอีกฝั่งจะเป็นบอทใช้สัญลักษณ์ "O" ผู้เล่นจะสลับกันวางสัญลักษณ์ของตนลงในตาราง 3x3 เป้าหมายคือการวางสัญลักษณ์ของตนให้ได้สามตัวติดกันในแนวนอน แนวตั้ง หรือแนวทแยง ผู้ที่ทำได้ก่อนจะเป็นผู้ชนะ หากตารางเต็มโดยไม่มีผู้ชนะเกมจะเสมอ 

โดยบอทที่ใช้จะใช้อัลกอลิธึม minimax สำหรับการหาค่าที่ดีที่สุดในการเดินแต่ละตา

## สารบัญ

- [เริ่มต้น](#เริ่มต้น)
- [วิธีการเล่น](#วิธีการเล่น)
- [คุณสมบัติ](#คุณสมบัติ)
- [เทคโนโลยีที่ใช้](#เทคโนโลยีที่ใช้)


## วิธีการเล่น

1. เปิดแอปพลิเคชันและเลือกว่าจะเล่นกับคอมพิวเตอร์หรือผู้เล่นอื่น
2. ผู้เล่นจะได้เป็น X คลิกในช่องว่างบนตาราง 3x3 เพื่อวาง X และ O จะเป็นของบอท
3. เป้าหมายคือการเรียง X หรือ O ของคุณให้ได้สามตัวติดกันในแนวนอน แนวตั้ง หรือแนวทแยง
4. เกมจะจบลงเมื่อมีผู้เล่นชนะหรือทุกช่องเต็มโดยไม่มีผู้ชนะ (เสมอ)
5. คลิกปุ่ม start เพื่อเริ่มเกมใหม่

## เริ่มต้น

เพื่อให้ได้สำเนาของโปรเจคนี้และรันบนเครื่องของคุณ ทำตามขั้นตอนดังนี้:

1. **โคลน Repository:**

    ```bash
    git clone https://github.com/seawave704/tic-tac-toe.git
    cd tic-tac-toe
    ```

2. **ติดตั้ง dependencies:**

    ```bash
    npm install
    ```

3. **รันเซิร์ฟเวอร์พัฒนา:**

    ```bash
    npm run dev
        or
    npm run build & npm run start
    ```

4. **เปิดเบราว์เซอร์ของคุณ:**

    ไปที่ [http://localhost:3000](http://localhost:3000) เพื่อดูแอปพลิเคชัน

## คุณสมบัติ

- เกม Tic-Tac-Toe
- มีระบบรีเพลย์แต่ละตา
- มีบอทที่ใช้อัลกอลิธึม

## เทคโนโลยีที่ใช้

- Next.js
- React
- TypeScript
- Tailwind CSS
- sqlite
- prisma
