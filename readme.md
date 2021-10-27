## demo1
A:
m * hash => Mac1
Kpb(Mac) => Em

A -> B:
Em || m

B:
Ksb(Em) => Mac1
m * hash => Mac2

## demo2
1. 防止A的公钥被冒充，引入CA

A -> CA:
Kpa

CA:
Ksca(Kpa) => Card

CA -> A:
Card

2. 用证书传递公钥

A -> B:
Card

B:
Kpca(Card) => Kpa

3. A加密传输DES秘钥对消息快速加密

A -> B:
ksa(Kdes)

B:
Kpa(Ksa(Kdes)) => Kdes

4. 消息加密传输，具有完整性验证HASH，通信的机密性和来源可靠DES，不可否认性数字签名RSA
A:
DES(m) => E
Hash(m) => MAC
Ksa(MAC) => Sign

A -> B:
E
Sign

B:
DES(E) => m
Hash(m) => Mac2
Kpa(Sign) => MAC

## parameters

generate:
sk, pk, tokenpath

write:
path1, content

send:
path1, path2

read:
path1

sign:
sk: floder1, file1
key: file2
tokenp: phrase

verify:
pk:
key
card/sign

aes.txt
16位

rsa-e:
aes.txt, pk

rsa-d:
enaes.txt, sk

aes-e:
mes, enmes

aes-d:
enmes, mes

hash:
enmes, mac1

sign:
floder,
sk, mac1
tokenp

verify;
    hash:
    enmes, mac2
floder,
pk, mac2
sign
