//fixing issue with react rounter interacting with jest
import { TextEncoder } from 'util';
global.TextEncoder = TextEncoder;