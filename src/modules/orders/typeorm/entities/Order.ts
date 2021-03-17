import Customer from '../../../customers/typeorm/entities/Customer';
import OrderProduct from '@modules/orders/typeorm/entities/OrderProduct';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => OrderProduct, order_products => order_products.order, {
    cascade: true,
  })
  orderProducts: OrderProduct[];
}

export default Order;
