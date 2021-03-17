import Product from '@modules/products/typeorm/entities/Product';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Order from './Order';

@Entity('order_products')
class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  quantity: number;

  @Column('decimal')
  price: number;

  @Column()
  order_id: string;

  @Column()
  product_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Order, order => order.order_products)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, product => product.order_products)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}

export default OrderProduct;
